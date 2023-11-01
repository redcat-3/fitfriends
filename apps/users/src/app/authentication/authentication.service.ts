import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthError } from './authentication.constant';
import { UserRepository } from '@project/repositories/user-repository';
import { User, UserRole, UserTime } from '@project/shared/shared-types';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from '@project/config/config-users';
import { ChangePasswordDto, CreateUserDto, LoginUserDto,  } from '@project/shared/shared-dto';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { createJWTPayload } from '@project/util/util-core';
import * as crypto from 'node:crypto';
import { TypeEntityAdapter } from '../../../../../repositories/user-repository/src/lib/entity-adapter';
import dayjs from 'dayjs';
import { adaptCreateDtoUser } from '@project/util/util-core';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject (jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  public async register(dto: CreateUserDto) {
    const dtoUser = adaptCreateDtoUser(dto);
    let user = {
      ... dtoUser,
      passwordHash: '',
      dateBirth: dayjs(dto.dateBirth).toDate(),
    };
    if (user.role === UserRole.User) {
      user = {
        ... user,
        certificate: '',
        merit: '',
        passwordHash: '',
        personalTraining: false
      }
    } else if (user.role === UserRole.Сoach) {
      user = {
        ... user,
        timeOfTraining: UserTime.One,
        caloriesToReset: 1000,
        caloriesToSpend: 1000,
        trainingReady: false,
      }
    }
  
    delete user.password;

    const existUser = await this.userRepository
      .findByEmail(dto.email);

    if (existUser) {
      throw new ConflictException(AuthError.UserExists);
    }

    const userEntity = new TypeEntityAdapter[user.role](user as unknown as User);
    await userEntity.setPassword(dto.password);

    return this.userRepository
      .create(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthError.NotFound);
    }

    const userEntity = new TypeEntityAdapter[existUser.role](existUser);
    if (!await userEntity.comparePassword(password)) {
      throw new UnauthorizedException(AuthError.PasswordWrong);
    }

    return userEntity.toObject();
  }

  public async getUser(id: string) {
    return this.userRepository.findById(id);
  }

  public async createUserToken(user: User) {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload)
    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      })
    }
  }

  public async changePassword(id:string, dto: ChangePasswordDto) {
    const {newPassword, currentPassword} = dto;
    if(currentPassword === newPassword){
      throw new BadRequestException (AuthError.PasswordSimilar);
    }
    const user = await this.getUser(id);
    const userEntity = new TypeEntityAdapter[user.role](user);
    if (!await userEntity.comparePassword(currentPassword)) {
      throw new BadRequestException (AuthError.PasswordWrong);
    }
    await userEntity.setPassword(newPassword)
    return this.userRepository.update(id, userEntity);
  }

  public async updateAvatar (id:string, avatar:string){
    const user = await this.getUser(id);
    const userEntity = new TypeEntityAdapter[user.role]({...user, avatar});
    return this.userRepository.update(id, userEntity);
  }
}
