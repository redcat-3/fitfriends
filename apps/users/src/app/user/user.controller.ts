import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard, adaptRdoUser } from '@project/util/util-core';
import { UserMessages, UserPath } from './user.constant';
import { RequestWithUserPayload } from '@project/shared/shared-types';
import { UpdateUserDto } from '@project/shared/shared-dto';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { UserQueryDto } from '@project/shared/shared-query';
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
    description: UserMessages.UserUpdated
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
  @Post(UserPath.List)
  public async show(@Req() { user }: RequestWithUserPayload, @Body() query: UserQueryDto) {
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
  @Patch(UserPath.Follow)
  public async followCoach(@Req() { user }: RequestWithUserPayload, @Param('id', MongoidValidationPipe) id: string) {
    const subscriber = await this.userService.findById(user.sub);
    const subscriberDto = {
      email: subscriber.email,
      name: subscriber.name,
      coachId: id
    }
    await this.userService.followCoach(user.sub, id);
    await this.notifyService.registerSubscriber(subscriberDto);
    
    return subscriber;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: UserMessages.Unfollow
  })
  @UseGuards(JwtAuthGuard)
  @Patch(UserPath.Unfollow)
  public async unfollowCoach(@Req() { user }: RequestWithUserPayload, @Param('id', MongoidValidationPipe) id: string) {
    const subscriber = await this.userService.findById(user.sub);
    const data = {
      email: subscriber.email,
      coach: id,
      name: subscriber.name
    }
    await this.userService.unfollowCoach(user.sub, id);
    await this.notifyService.removeSubscriber({... data});

    return subscriber;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: UserMessages.AddFriend
  })
  @UseGuards(JwtAuthGuard)
  @Patch(UserPath.AddFriend)
  public async addFriend(@Req() { user }: RequestWithUserPayload, @Param('id', MongoidValidationPipe) id: string) {
    await this.userService.addToFriends(user.sub, id);
    return;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: UserMessages.RemoveFriend
  })
  @UseGuards(JwtAuthGuard)
  @Patch(UserPath.RemoveFriend)
  public async removeFriend(@Req() { user }: RequestWithUserPayload, @Param('id', MongoidValidationPipe) id: string) {
    await this.userService.removeFromFriends(user.sub, id);
    return;
  }
}
