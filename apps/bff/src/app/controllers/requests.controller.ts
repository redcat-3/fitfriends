import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL, BffError, BffMessages, BffPath } from '../app.constant';
import { CreateRequestDto, UpdateWorkoutDto } from '@project/shared/shared-dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(BffPath.RequestsMain)
@Controller(BffPath.RequestsMain)
@UseFilters(AxiosExceptionFilter)
export class RequestsController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: BffMessages.RequestAdd,
  })
  @UseGuards(CheckAuthGuard)
  @Post(BffPath.Add)
  public async create(@Req() req:Request, @Body() dto: CreateRequestDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Requests}/${BffPath.Add}`, dto, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BffMessages.RequestUpdate,
  })
  @UseGuards(CheckAuthGuard)
  @Patch(BffPath.RequestsId)
  public async update(@Req() req:Request,
    @Param('id') id: number,
    @Body() dto: UpdateWorkoutDto) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Requests}/${id}`, dto, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BffMessages.RequestDelete,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BffError.RequestDelete
  })
  @UseGuards(CheckAuthGuard)
  @Delete(BffPath.RequestsId)
  public async delete(@Req() req:Request, @Param('id') id: number) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Requests}/${id}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BffMessages.RequestShow
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BffError.RequestNotFound
  })
  @UseGuards(CheckAuthGuard)
  @Get(BffPath.RequestsId)
  public async show(@Req() req:Request, @Param('id') id: number) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Requests}/${id}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BffMessages.RequestIndex
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BffError.RequestEmptyList
  })
  @Get(BffPath.List)
  public async index(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Requests}/${BffPath.List}`, {
        headers: {
            'Authorization': req.headers['authorization']
        }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BffMessages.RequestIndex
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BffError.RequestEmptyList
  })
  @UseGuards(CheckAuthGuard)
  @Get(BffPath.RequestsIndexMyRequests)
  public async indexMyRequests(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Requests}/${BffPath.RequestsIndexMyRequests}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }
}