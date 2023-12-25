import { Controller, Delete, Get, HttpStatus, Param, Req, UseFilters, UseGuards } from '@nestjs/common';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL, BffError, BffMessages, BffPath } from '../app.constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(BffPath.NotificationMain)
@Controller(BffPath.NotificationMain)
@UseFilters(AxiosExceptionFilter)
export class NotificationsController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: BffMessages.NotificationDelete,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BffError.NotificationDelete
  })
  @UseGuards(CheckAuthGuard)
  @Delete(BffPath.NotificationId)
  public async delete(@Req() req:Request, @Param('notificationId') id: number) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Notifications}/${id}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BffMessages.NotificationShow
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BffError.NotificationNotFound
  })
  @UseGuards(CheckAuthGuard)
  @Get(BffPath.NotificationId)
  public async show(@Req() req:Request, @Param('notificationId') id: number) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Notifications}/list/${id}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BffMessages.NotificationIndex
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BffError.NotificationEmptyList
  })
  @Get(BffPath.List)
  public async index(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Notifications}/${BffPath.List}`, {
        headers: {
            'Authorization': req.headers['authorization']
        }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BffMessages.NotificationIndex
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BffError.NotificationEmptyList
  })
  @UseGuards(CheckAuthGuard)
  @Get(BffPath.List)
  public async indexMyRequests(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Notifications}/${BffPath.List}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }
}