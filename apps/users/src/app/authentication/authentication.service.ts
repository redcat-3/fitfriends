import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthError } from './authentication.constant';
import { BlogUserEntity } from '../../../../../libs/repositories/user-repository/src/lib/blog-user.entity';
import { BlogUserRepository } from '../../../../../libs/repositories/user-repository/src/lib/blog-user.repository';
import { User } from '@project/shared/shared-types';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from '@project/config/config-users';
import { ChangePasswordDto, CreateUserDto, LoginUserDto,  } from '@project/shared/shared-dto';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { createJWTPayload } from '@project/util/util-core';
import * as crypto from 'node:crypto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
    @Inject (jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  public async register(dto: CreateUserDto) {
    const {email, name, password, avatarId } = dto;

    const blogUser = {
      email,
      name,
      avatar: avatarId || '',
      passwordHash: '',
    };

    const existUser = await this.blogUserRepository
      .findByEmail(email);

    if (existUser) {
      throw new ConflictException(AuthError.UserExists);
    }

    const userEntity = await new BlogUserEntity(blogUser)
      .setPassword(password)

    return this.blogUserRepository
      .create(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthError.NotFound);
    }

    const blogUserEntity = new BlogUserEntity(existUser);
    if (!await blogUserEntity.comparePassword(password)) {
      throw new UnauthorizedException(AuthError.PasswordWrong);
    }

    return blogUserEntity.toObject();
  }

  public async getUser(id: string) {
    return this.blogUserRepository.findById(id);
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
    const blogUser = await this.getUser(id);
    const blogUserEntity = new BlogUserEntity(blogUser);
    if (!await blogUserEntity.comparePassword(currentPassword)) {
      throw new BadRequestException (AuthError.PasswordWrong);
    }
    await blogUserEntity.setPassword(newPassword)
    return this.blogUserRepository.update(id, blogUserEntity);
  }

  public async updateAvatar (id:string, avatarId:string){
    const blogUser = await this.getUser(id);
    const blogUserEntity = new BlogUserEntity({...blogUser, avatar:avatarId});
    return this.blogUserRepository.update(id, blogUserEntity);
  }
}
