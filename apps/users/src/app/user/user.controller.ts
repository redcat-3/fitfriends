import { Body, Controller, Get, HttpStatus, Param, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard, adaptRdoUser } from '@project/util/util-core';
import { UserMessages, UserPath } from './user.constant';
import { RequestWithUserPayload } from '@project/shared/shared-types';
import { UpdateUserDto } from '@project/shared/shared-dto';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { UserQuery } from '@project/shared/shared-query';
import { NotifyService } from '../notify/notify.service';

@Controller(UserPath.Main)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly notifyService: NotifyService
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

  @ApiResponse({
    status: HttpStatus.OK,
    description: UserMessages.Follow
  })
  @UseGuards(JwtAuthGuard)
  @Get(UserPath.Follow)
  public async followCoach(@Req() {user}, @Param('id') id: string) {
    const subscriber = await this.userService.findById(user.id);
    const subscriberDto = {
      email: subscriber.email,
      name: subscriber.name,
      coachId: id
    }
    await this.userService.followCoach(user._id, id);
    await this.notifyService.registerSubscriber(subscriberDto);
    
    return subscriber;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: UserMessages.Unfollow
  })
  @UseGuards(JwtAuthGuard)
  @Get(UserPath.Unfollow)
  public async unfollowCoach(@Req() {user}, @Param('id') id: string) {
    const subscriber = await this.userService.findById(user.id);
    const data = {
      email: subscriber.email,
      coach: id,
      name: subscriber.name
    }
    await this.userService.unfollowCoach(user._id, id);
    await this.notifyService.removeSubscriber({... data});

    return subscriber;
  }
}
