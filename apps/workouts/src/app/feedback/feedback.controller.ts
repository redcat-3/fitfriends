import { Req, Controller, HttpStatus, Param, Post, Get, UseGuards, Body } from '@nestjs/common';
import { FeedbacksService } from './feedback.service';
import { API_TAG_NAME, FeedbacksMessages, FeedbacksPath } from './feedback.constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, fillObject } from '@project/util/util-core';
import { FeedbackRdo } from './rdo/feedback.rdo';
import { RequestWithUserPayload } from '@project/shared/shared-types';
import { CreateFeedbackDto } from '@project/shared/shared-dto';
import { FeedbackQueryDto } from '@project/shared/shared-query';

@ApiTags(API_TAG_NAME)
@Controller(FeedbacksPath.Main)
export class FeedbacksController {
  constructor(
    private readonly feedbacksService: FeedbacksService,
  ) {}

  @ApiResponse({
    type: FeedbackRdo,
    status:HttpStatus.CREATED,
    description: FeedbacksMessages.Add
  })
  @UseGuards(JwtAuthGuard)
  @Post(FeedbacksPath.Add)
  public async addFeedback(@Body() dto: CreateFeedbackDto, @Req() {user}: RequestWithUserPayload) {
    const userId = user.sub;
    const newFeedback = await this.feedbacksService.create(dto, userId);
    return fillObject(FeedbackRdo, newFeedback);
  }

  @ApiResponse({
    type: FeedbackRdo,
    status: HttpStatus.OK,
    description: FeedbacksMessages.Show,
  })
  @Get(FeedbacksPath.Id)
  public async showFeedbacks(@Param('feedbackId') id:number) {
    const feedback = await this.feedbacksService.findByFeedbackId(id);
    return fillObject(FeedbackRdo, feedback);
  }

  @ApiResponse({
    type: FeedbackRdo,
    status: HttpStatus.OK,
    description: FeedbacksMessages.Show,
  })
  @Post(FeedbacksPath.Index)
  public async indexFeedbacks(@Param('workoutId') id:number, @Body() query : FeedbackQueryDto ) {
    const feedbacks = await this.feedbacksService.findByWorkoutId(id, query);
    return feedbacks.map((feedback) => fillObject(FeedbackRdo, feedback));
  }
}
