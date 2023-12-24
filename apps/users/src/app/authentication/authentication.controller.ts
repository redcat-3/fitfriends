import { Body, Req, Controller, HttpStatus, Post, UseGuards, Patch } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { JwtAuthGuard, fillObject } from '@project/util/util-core';
import { LoggedUserRdo } from '@project/shared/shared-rdo';
import { API_TAG_NAME, AuthError, AuthMessages, AuthPath } from './authentication.constant';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserValidationPipe } from '@project/shared/shared-pipes';
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
      type: LoggedUserRdo,
      status: HttpStatus.OK,
      description: AuthMessages.PasswordChanged
    })
    @UseGuards(JwtAuthGuard)
    @Post(AuthPath.ChangePassword)
    public async changePassword(@Req() { user }: RequestWithUserPayload, @Body() dto:ChangePasswordDto) {
    return this.authService.changePassword(user.sub, dto);
    }

    @UseGuards(JwtRefreshGuard)
    @Post(AuthPath.Refresh)
    @ApiResponse({
      status: HttpStatus.OK,
      description:AuthMessages.Refresh
    })
    public async refreshToken(@Req() { user }: RequestWithUser) {
      return await this.authService.createUserToken(user);
    }

    @UseGuards(JwtAuthGuard)
    @Post(AuthPath.Check)
    public async checkToken(@Req() { user: payload }: RequestWithUserPayload) {
      return payload;
    }

    @ApiResponse({
      status: HttpStatus.OK,
      description: AuthMessages.AvatarAdded
    })
    @UseGuards(JwtAuthGuard)
    @Patch(AuthPath.UpdateAvatar)
    public async updateAvatar(@Req() { user }: RequestWithUserPayload, @Body('avatarId') avatarId:string) {
      const updatedUser = await this.authService.updateAvatar(user.sub, avatarId);
      return adaptRdoUser(updatedUser);
    }
  }
