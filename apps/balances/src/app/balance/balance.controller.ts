import { Req, Controller, HttpStatus, Param, Get, UseGuards, Delete } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { API_TAG_NAME, BalanceMessages, BalancePath } from './balance.constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@project/util/util-core';
import { BalanceRdo } from './rdo/balance.rdo';
import { RequestWithUserPayload } from '@project/shared/shared-types';

@ApiTags(API_TAG_NAME)
@Controller(BalancePath.Main)
export class BalanceController {
  constructor(
    private readonly balanceService: BalanceService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: BalanceMessages.Delete,
  })
  @UseGuards(JwtAuthGuard)
  @Delete(BalancePath.Id)
  public async deleteBalance(@Param('balanceId') id: number, @Req() {user}: RequestWithUserPayload) {
    const userId = user.sub;
    return await this.balanceService.delete(id, userId,);
  }

  @ApiResponse({
    type: BalanceRdo,
    status: HttpStatus.OK,
    description: BalanceMessages.Show,
  })
  @UseGuards(JwtAuthGuard)
  @Get(BalancePath.Id)
  public async showBalance(@Param('balanceId') balanceId: number, @Req() {user}: RequestWithUserPayload) {
    return await this.balanceService.findByBalanceId(balanceId, user.sub);
  }

  @ApiResponse({
    type: BalanceRdo,
    status: HttpStatus.OK,
    description: BalanceMessages.Index,
  })
  @UseGuards(JwtAuthGuard)
  @Get(BalancePath.Index)
  public async indexBalance(@Req() {user}: RequestWithUserPayload) {
    return await this.balanceService.findByUser(user.sub);
  }
}
