import { Body, Controller, Get, HttpStatus, Param, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL, BffError, BffMessages, BffPath } from '../app.constant';
import { CreateOrderDto } from '@project/shared/shared-dto';
import { OrderQueryDto } from '@project/shared/shared-query';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(BffPath.OrderMain)
@Controller(BffPath.OrderMain)
@UseFilters(AxiosExceptionFilter)
export class OrdersController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: BffMessages.OrderAdd,
  })
  @UseGuards(CheckAuthGuard)
  @Post(BffPath.Add)
  public async create(@Req() req:Request, @Body() dto: CreateOrderDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Orders}/${BffPath.Add}`, dto, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BffMessages.OrderShow
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BffError.OrderNotFound
  })
  @UseGuards(CheckAuthGuard)
  @Get(BffPath.OrderId)
  public async show(@Req() req:Request, @Param('id') id: number) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Orders}/${id}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BffMessages.OrderIndex
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BffError.OrderEmptyList
  })
  @UseGuards(CheckAuthGuard)
  @Post(BffPath.OrderIndex)
  public async index(@Req() req:Request, @Param('workoutId') id: number, @Body() dto : OrderQueryDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Orders}/list/${id}`, dto, {
    headers: {
        'Authorization': req.headers['authorization']
        }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BffMessages.OrderIndex
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BffError.OrderEmptyList
  })
  @UseGuards(CheckAuthGuard)
  @Post(BffPath.OrderIndexCoach)
  public async coachIndex(@Req() req: Request, @Body() dto: OrderQueryDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Orders}/${BffPath.OrderIndexCoach}`, dto, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }
}