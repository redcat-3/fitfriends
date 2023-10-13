import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse } from '@nestjs/swagger';
import { UserRdo } from './rdo/user.rdo';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User find'
  })
  @Get(':id')
  public async getUserById(@Param('id') id: string) {
    return await this.userService.findById(id);
  }
}
