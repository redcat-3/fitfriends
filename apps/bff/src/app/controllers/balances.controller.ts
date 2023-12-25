import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Req, UseFilters, UseGuards } from '@nestjs/common';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL, BffError, BffMessages, BffPath } from '../app.constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateBalanceDto } from '@project/shared/shared-dto';

@ApiTags(BffPath.BalanceMain)
@Controller(BffPath.BalanceMain)
@UseFilters(AxiosExceptionFilter)
export class BalancesController {
  constructor(
    private readonly httpService: HttpService,
  ) {}
    
  @ApiResponse({
    status: HttpStatus.OK,
    description: BffMessages.BalanceUpdate,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BffError.BalanceUpdate
  })
  @UseGuards(CheckAuthGuard)
  @Patch(BffPath.Update)
  public async update(@Req() req:Request, @Body() dto: UpdateBalanceDto) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Balances}/${BffPath.Update}`, dto, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }
  
  @ApiResponse({
    status: HttpStatus.OK,
    description: BffMessages.BalanceDelete,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BffError.BalanceDelete
  })
  @UseGuards(CheckAuthGuard)
  @Delete(BffPath.BalanceId)
  public async delete(@Req() req: Request, @Param('balanceId') id: number) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Balances}/list/${id}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BffMessages.BalanceShow
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BffError.BalanceNotFound
  })
  @UseGuards(CheckAuthGuard)
  @Get(BffPath.BalanceId)
  public async show(@Req() req:Request, @Param('balanceId') id: number) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Balances}/list/${id}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BffMessages.BalanceIndex
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BffError.BalanceEmptyList
  })
  @Get(BffPath.List)
  public async index(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Balances}/${BffPath.List}`, {
        headers: {
            'Authorization': req.headers['authorization']
        }
    });
    return data;
  }
}