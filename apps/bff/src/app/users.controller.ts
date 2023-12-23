import { Body, Controller, Get, Param, Patch, Post, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL, BffPath } from './app.constant';
import { Request } from 'express';
import { ChangePasswordDto, CreateUserDto, LoginUserDto, UpdateUserDto } from '@project/shared/shared-dto';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UserIdInterceptor } from './interceptors/userid.interceptor';
import { UserQueryDto } from '@project/shared/shared-query';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
    constructor(
      private readonly httpService: HttpService
    ) {}
  
    @Post(BffPath.Register)
    public async create(@Body() dto: CreateUserDto) {
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/${BffPath.Register}`, dto);
      return data;
    }

    @Post(BffPath.Login)
    public async login(@Body() loginUserDto: LoginUserDto) {
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/${BffPath.Login}`, loginUserDto);
      return data;
    }

    @Post(BffPath.Refresh)
    public async refreshToken(@Req() req: Request) {
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/${BffPath.Refresh}`, null, {
        headers: {
          'Authorization': req.headers['Authorization']
        }
      });
      return data;
    }

    @UseGuards(CheckAuthGuard)
    @Post(BffPath.ChangePassword)
    public async changePassword(@Body() dto: ChangePasswordDto) {
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/${BffPath.ChangePassword}`, dto);
      return data;
    }

    @UseGuards(CheckAuthGuard)
    @UseInterceptors(UserIdInterceptor)
    @Patch(BffPath.UpdateAvatar)
    public async updateAvatar(@Body() avatarId: string) {
      const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Auth}/${BffPath.UpdateAvatar}`, avatarId);
      return data;
    }

    @UseGuards(CheckAuthGuard)
    @UseInterceptors(UserIdInterceptor)
    @Get(BffPath.UserId)
    public async getUser(@Param('id') id: string) {
      const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${BffPath.Friends}/${id}`);
      return data;
    }

    @UseGuards(CheckAuthGuard)
    @UseInterceptors(UserIdInterceptor)
    @Patch(BffPath.UserUpdate)
    public async update(@Body() dto: UpdateUserDto) {
      const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/${BffPath.UserUpdate}`, dto);
      return data;
    }

    @UseGuards(CheckAuthGuard)
    @UseInterceptors(UserIdInterceptor)
    @Post(BffPath.UserList)
    public async show(@Body() dto: UserQueryDto) {
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/${BffPath.UserList}`, dto);
      return data;
    }

    @UseGuards(CheckAuthGuard)
    @UseInterceptors(UserIdInterceptor)
    @Get(BffPath.Friends)
    public async showFriends() {
      const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${BffPath.Friends}`);
      return data;
    }

    @UseGuards(CheckAuthGuard)
    @UseInterceptors(UserIdInterceptor)
    @Patch(BffPath.Follow)
    public async followCoach(@Param('id') id: string) {
      const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/${BffPath.Friends}/follow/${id}`);
      return data;
    }

    @UseGuards(CheckAuthGuard)
    @UseInterceptors(UserIdInterceptor)
    @Patch(BffPath.Unfollow)
    public async unfollowCoach(@Param('id') id: string) {
      const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/${BffPath.Friends}/unfollow/${id}`);
      return data;
    }

    @UseGuards(CheckAuthGuard)
    @UseInterceptors(UserIdInterceptor)
    @Patch(BffPath.AddFriend)
    public async addFriend(@Param('id') id: string) {
      const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/friends/add/${id}`);
      return data;
    }

    @UseGuards(CheckAuthGuard)
    @UseInterceptors(UserIdInterceptor)
    @Patch(BffPath.RemoveFriend)
    public async removeFriend(@Param('id') id: string) {
      const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/friends/remove/${id}`);
      return data;
    }
  }