import { Body, Controller, Get, HttpStatus, Param, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard, adaptRdoUser } from '@project/util/util-core';
import { UserMessages, UserPath } from './user.constant';
import { RequestWithUserPayload } from '@project/shared/shared-types';
import { UpdateUserDto } from '@project/shared/shared-dto';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { UserQuery } from '@project/shared/shared-query';

@Controller(UserPath.Main)
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: UserMessages.UserFound
  })
  @UseGuards(JwtAuthGuard)
  @Get(UserPath.Id)
  public async getUserById(@Param('id', MongoidValidationPipe) id: string) {
    const findUser = await this.userService.findById(id);
    return adaptRdoUser(findUser);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: UserMessages.AvatarAdded
  })
  @UseGuards(JwtAuthGuard)
  @Patch(UserPath.Update)
  public async update(@Req() { user }: RequestWithUserPayload, @Body() dto: UpdateUserDto) {
    const updatedUser = await this.userService.update(user.sub, dto);
    return adaptRdoUser(updatedUser);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: UserMessages.List
  })
  @UseGuards(JwtAuthGuard)
  @Get(UserPath.List)
  public async show(@Req() { user }: RequestWithUserPayload, @Query() query:UserQuery) {
    const users = await this.userService.getUsersList(user.sub, query);
    if (!users) {
      return [];
    }
    return users.map((user) => adaptRdoUser(user));
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: UserMessages.Friends
  })
  @UseGuards(JwtAuthGuard)
  @Get(UserPath.Friends)
  public async showFriends(@Req() { user }: RequestWithUserPayload) {
    const friends = await this.userService.getFriendsByUserId(user.sub);
    if (!friends) {
      return [];
    }
    return friends.map((user) => adaptRdoUser(user));
  }
}
