import { Req, Controller, HttpStatus, Param, Post, Get, UseGuards, Body, Query } from '@nestjs/common';
import { OrdersService } from './order.service';
import { API_TAG_NAME, OrdersMessages, OrdersPath } from './order.constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, fillObject } from '@project/util/util-core';
import { OrderRdo } from './rdo/order.rdo';
import { RequestWithUserPayload } from '@project/shared/shared-types';
import { CreateOrderDto } from '@project/shared/shared-dto';
import { OrderQuery } from '@project/shared/shared-query';

@ApiTags(API_TAG_NAME)
@Controller(OrdersPath.Main)
export class OrdersController {
  constructor(
    private readonly OrdersService: OrdersService,
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
    const newOrder = await this.OrdersService.create(dto, userId);
    return fillObject(OrderRdo, newOrder);
  }

  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.OK,
    description: OrdersMessages.Show,
  })
  @Get(OrdersPath.Id)
  public async showOrders(@Param('OrderId') id:number) {
    const Order = await this.OrdersService.findByOrderId(id);
    return fillObject(OrderRdo, Order);
  }

  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.OK,
    description: OrdersMessages.Show,
  })
  @Get(OrdersPath.Index)
  public async indexOrders(@Param('workoutId') id:number, @Query() query : OrderQuery ) {
    const orders = await this.OrdersService.findByWorkoutId(id, query);
    return orders.map((order) => fillObject(OrderRdo, order));
  }
  
  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.OK,
    description: OrdersMessages.Show,
  })
  @Get(OrdersPath.Index)
  public async indexCoachOrders(@Param('coachId') id:string ) {
    const orders = await this.OrdersService.findByCoachId(id);
    return orders;
  }
}
