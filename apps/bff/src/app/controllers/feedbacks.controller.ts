import { Body, Controller, Get, HttpStatus, Param, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL, BffError, BffMessages, BffPath } from '../app.constant';
import { CreateFeedbackDto } from '@project/shared/shared-dto';
import { FeedbackQueryDto } from '@project/shared/shared-query';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(BffPath.FeedbackMain)
@Controller(BffPath.FeedbackMain)
@UseFilters(AxiosExceptionFilter)
export class FeedbacksController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: BffMessages.FeedbackAdd,
  })
  @UseGuards(CheckAuthGuard)
  @Post(BffPath.Add)
  public async create(@Req() req:Request, @Body() dto: CreateFeedbackDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Feedbacks}/${BffPath.Add}`, dto, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BffMessages.FeedbackShow
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BffError.FeedbackNotFound
  })
  @Get(BffPath.FeedbackId)
  public async show(@Param('feedbackId') id: number) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Feedbacks}/${id}`);
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BffMessages.FeedbackIndex
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BffError.FeedbackEmptyList
  })
  @Post(BffPath.FeedbackIndex)
  public async index(@Param('workoutId') id: number, @Body() dto : FeedbackQueryDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Feedbacks}/list/${id}`, dto);
    return data;
  }
}