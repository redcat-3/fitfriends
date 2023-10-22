import { Body, Req, Controller, Get, HttpStatus,HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { JwtAuthGuard, fillObject } from '@project/util/util-core';
import { UserRdo } from './rdo/user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { API_TAG_NAME, AuthError, AuthMessages, AuthPath } from './authentication.constant';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserValidationPipe, MongoidValidationPipe } from '@project/shared/shared-pipes';
import { RequestWithUser, RequestWithUserPayload } from '@project/shared/shared-types';
import { adaptRdoUser } from '@project/util/util-core';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { ChangePasswordDto, CreateUserDto, UserCoachDto, UserUserDto } from '@project/shared/shared-dto';

@ApiTags(API_TAG_NAME)
@ApiExtraModels(UserUserDto, UserCoachDto,  ChangePasswordDto)
@Controller(AuthPath.Main)
  export class AuthenticationController {
    constructor(
      private readonly authService: AuthenticationService
    ) {}

    @ApiResponse({
      status:HttpStatus.CREATED,
      description:AuthMessages.Register
    })
    @Post(AuthPath.Register)
    public async create(@Body(CreateUserValidationPipe) dto: CreateUserDto) {
      const newUser = await this.authService.register(dto);
      return adaptRdoUser(newUser);
    }

    @ApiResponse({
      type: LoggedUserRdo,
      status: HttpStatus.OK,
      description: AuthMessages.Login
    })
    @ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: AuthError.InvalidData,
    })
    @UseGuards(LocalAuthGuard)
    @Post(AuthPath.Login)
    public async login(@Req() {user}: RequestWithUser) {
    const loggedUser = await this.authService.createUserToken(user);
    return await fillObject(LoggedUserRdo, loggedUser);
    }

    @ApiResponse({
      type: UserRdo,
      status: HttpStatus.OK,
      description: AuthMessages.UserFound
    })
    @Get(AuthPath.Id)
    public async show(@Param('id', MongoidValidationPipe) id: string) {
      const existUser = await this.authService.getUser(id);
      return adaptRdoUser(existUser);
    }

    @ApiResponse({
      type: LoggedUserRdo,
      status: HttpStatus.OK,
      description: AuthMessages.PasswordChanged
    })
    @UseGuards(JwtAuthGuard)
    @Post(AuthPath.ChangePassword)
    public async changePassword(@Req() { user }: RequestWithUserPayload, @Body() dto:ChangePasswordDto) {
    return this.authService.changePassword(user.sub, dto);
    }

    @HttpCode(HttpStatus.OK)
    @ApiResponse({
      status: HttpStatus.OK,
      description:AuthMessages.Refresh
    })
    @Post(AuthPath.Refresh)
    @UseGuards(JwtRefreshGuard)
    public async refreshToken(@Req() { user }: RequestWithUser) {
      return this.authService.createUserToken(user);
    }

    @UseGuards(JwtAuthGuard)
    @Post(AuthPath.Check)
    public async checkToken(@Req() { user: payload }: RequestWithUserPayload) {
      return payload;
    }

    @ApiResponse({
      status: HttpStatus.OK,
      description:AuthMessages.AvatarAdded
    })
    @UseGuards(JwtAuthGuard)
    @Post(AuthPath.UpdateAvatar)
    public async updateAvatar(@Req() { user }: RequestWithUserPayload, @Body('avatarId') avatarId:string) {
      const updatedUser = await this.authService.updateAvatar(user.sub, avatarId);
      return adaptRdoUser(updatedUser);
    }
  }
