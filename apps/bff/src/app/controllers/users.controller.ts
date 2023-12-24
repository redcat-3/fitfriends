import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL, BffError, BffMessages, BffPath } from '../app.constant';
import { Request } from 'express';
import { ChangePasswordDto, CreateUserDto, LoginUserDto, UpdateUserDto } from '@project/shared/shared-dto';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { UserQueryDto } from '@project/shared/shared-query';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';

@ApiTags(BffPath.UserMain)
@Controller(BffPath.UserMain)
@UseFilters(AxiosExceptionFilter)
export class UsersController {
    constructor(
      private readonly httpService: HttpService
    ) {}
  
    @ApiResponse({
      status:HttpStatus.CREATED,
      description:BffMessages.Register
    })
    @Post(BffPath.Register)
    public async create(@Body() dto: CreateUserDto) {
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/${BffPath.Register}`, dto);
      return data;
    }

    
    @ApiResponse({
      status: HttpStatus.OK,
      description: BffMessages.Login
    })
    @ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: BffError.InvalidData,
    })
    @Post(BffPath.Login)
    public async login(@Body() loginUserDto: LoginUserDto) {
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/${BffPath.Login}`, loginUserDto);
      return data;
    }

    @ApiResponse({
      status: HttpStatus.OK,
      description:BffMessages.Refresh
    })
    @Post(BffPath.Refresh)
    public async refreshToken(@Req() req: Request) {
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/${BffPath.Refresh}`, null, {
        headers: {
          'Authorization': req.headers['authorization']
        }
      });
      return data;
    }

    @ApiResponse({
      status: HttpStatus.OK,
      description: BffMessages.PasswordChanged
    })
    @UseGuards(CheckAuthGuard)
    @Post(BffPath.ChangePassword)
    public async changePassword(@Req() req: Request, @Body() dto: ChangePasswordDto) {
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/${BffPath.ChangePassword}`, dto, {
        headers: {
          'Authorization': req.headers['authorization']
        }
      });
      return data;
    }

    @ApiResponse({
      status: HttpStatus.OK,
      description:BffMessages.AvatarAdded
    })
    @UseGuards(CheckAuthGuard)
    @Patch(BffPath.UpdateAvatar)
    public async updateAvatar(@Req() req: Request, @Body() avatarId: string) {
      const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Auth}/${BffPath.UpdateAvatar}`, avatarId, {
        headers: {
          'Authorization': req.headers['authorization']
        }
      });
      return data;
    }

    @ApiResponse({
      status: HttpStatus.OK,
      description: BffMessages.UserFound
    })
    @ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: BffError.UserNotFound
    })
    @Get(BffPath.UserId)
    public async getUser(@Param('id') id: MongoidValidationPipe) {
      const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${BffPath.Friends}/${id}`);
      return data;
    }

    
    @ApiResponse({
      status: HttpStatus.OK,
      description:BffMessages.UserUpdated
    })
    @UseGuards(CheckAuthGuard)
    @Patch(BffPath.UserUpdate)
    public async update(@Req() req: Request, @Body() dto: UpdateUserDto) {
      const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/${BffPath.UserUpdate}`, dto, {
        headers: {
          'Authorization': req.headers['authorization']
        }
      });
      return data;
    }

    @ApiResponse({
      status: HttpStatus.OK,
      description:BffMessages.UserList
    })
    @UseGuards(CheckAuthGuard)
    @Post(BffPath.UserList)
    public async show(@Req() req: Request, @Body() dto: UserQueryDto) {
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/${BffPath.UserList}`, dto, {
        headers: {
          'Authorization': req.headers['authorization']
        }
      });
      return data;
    }

    @ApiResponse({
      status: HttpStatus.OK,
      description:BffMessages.UserList
    })
    @UseGuards(CheckAuthGuard)
    @Get(BffPath.Friends)
    public async showFriends(@Req() req: Request) {
      const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${BffPath.Friends}`, {
        headers: {
          'Authorization': req.headers['authorization']
        }
      });
      return data;
    }

    @ApiResponse({
      status: HttpStatus.OK,
      description:BffMessages.Follow
    })
    @UseGuards(CheckAuthGuard)
    @Patch(BffPath.Follow)
    public async followCoach(@Req() req: Request, @Param('id') id: MongoidValidationPipe) {
      const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/${BffPath.Friends}/follow/${id}`, {}, {
        headers: {
          'Authorization': req.headers['authorization']
        }
      });
      return data;
    }

    @ApiResponse({
      status: HttpStatus.OK,
      description:BffMessages.Unfollow
    })
    @UseGuards(CheckAuthGuard)
    @Patch(BffPath.Unfollow)
    public async unfollowCoach(@Req() req: Request, @Param('id') id: MongoidValidationPipe) {
      const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/${BffPath.Friends}/unfollow/${id}`, {}, {
        headers: {
          'Authorization': req.headers['authorization']
        }
      });
      return data;
    }

    @UseGuards(CheckAuthGuard)
    @Patch(BffPath.AddFriend)
    public async addFriend(@Req() req: Request, @Param('id') id: MongoidValidationPipe) {
      const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/friends/add/${id}`, {}, {
        headers: {
          'Authorization': req.headers['authorization']
        }
      });
      return data;
    }

    @UseGuards(CheckAuthGuard)
    @Patch(BffPath.RemoveFriend)
    public async removeFriend(@Req() req: Request, @Param('id') id: MongoidValidationPipe) {
      const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/friends/remove/${id}`, {}, {
        headers: {
          'Authorization': req.headers['authorization']
        }
      });
      return data;
    }
  }