import { Req, Controller, HttpStatus, Param, Post, Get, UseGuards, Body } from '@nestjs/common';
import { OrdersService } from './order.service';
import { API_TAG_NAME, OrdersMessages, OrdersPath } from './order.constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, fillObject } from '@project/util/util-core';
import { OrderRdo } from './rdo/order.rdo';
import { RequestWithUserPayload } from '@project/shared/shared-types';
import { CreateOrderDto } from '@project/shared/shared-dto';
import { OrderQueryDto } from '@project/shared/shared-query';

@ApiTags(API_TAG_NAME)
@Controller(OrdersPath.Main)
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) {}

  @ApiResponse({
    type: OrderRdo,
    status:HttpStatus.CREATED,
    description: OrdersMessages.Add
  })
  @UseGuards(JwtAuthGuard)
  @Post(OrdersPath.Add)
  public async addOrder(@Body() dto: CreateOrderDto, @Req() {user}: RequestWithUserPayload) {
    const userId = user.sub;
    const newOrder = await this.ordersService.create(dto, userId);
    return fillObject(OrderRdo, newOrder);
  }

  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.OK,
    description: OrdersMessages.Show,
  })
  @UseGuards(JwtAuthGuard)
  @Get(OrdersPath.Id)
  public async showOrders(@Param('orderId') id:number, @Req() {user}: RequestWithUserPayload) {
    const userId = user.sub;
    const order = await this.ordersService.findByOrderId(userId, id);
    return fillObject(OrderRdo, order);
  }

  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.OK,
    description: OrdersMessages.Show,
  })
  @UseGuards(JwtAuthGuard)
  @Post(OrdersPath.Index)
  public async indexOrders(@Param('workoutId') id:number, @Body() query : OrderQueryDto, @Req() {user}: RequestWithUserPayload) {
    const userId = user.sub;
    const orders = await this.ordersService.findByWorkoutId(userId, id, query);
    return orders.map((order) => fillObject(OrderRdo, order));
  }
  
  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.OK,
    description: OrdersMessages.Show,
  })
  @UseGuards(JwtAuthGuard)
  @Post(OrdersPath.IndexCoach)
  public async indexCoachOrders(@Req() {user}: RequestWithUserPayload, @Body() query : OrderQueryDto ) {
    const orders = await this.ordersService.findByCoachId(user.sub, query);
    return orders;
  }
}
