import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { ApiTagNameBFF, ApplicationServiceURL, BffError, BffMessages, BffPath } from './app.constant';
import { UserIdInterceptor } from './interceptors/userid.interceptor';
import { CreateWorkoutDto, UpdateWorkoutDto } from '@project/shared/shared-dto';
import { WorkoutCoachQueryDto, WorkoutQueryDto } from '@project/shared/shared-query';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WorkoutRdo } from '@project/shared/shared-rdo';

@ApiTags(ApiTagNameBFF.Workouts)
@ApiExtraModels(CreateWorkoutDto, UpdateWorkoutDto)
@Controller(BffPath.WorkoutMain)
@UseFilters(AxiosExceptionFilter)
export class WorkoutsController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.CREATED,
    description: BffMessages.WorkoutAdd,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post(BffPath.WorkoutAdd)
  public async create(@Body() dto: CreateWorkoutDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Workouts}/add`, dto);
    return data;
  }

  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.OK,
    description: BffMessages.WorkoutUpdate,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Patch(BffPath.WorkoutId)
  public async update(@Param('id') id: number,
    @Body() dto: UpdateWorkoutDto) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Workouts}/${id}`, dto);
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BffMessages.WorkoutRemove,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BffError.WorkoutDelete
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Delete(BffPath.WorkoutId)
  public async delete(@Param('id') id: number) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Workouts}/${id}`);
    return data;
  }

  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.OK,
    description: BffMessages.WorkoutShow
  })
  @Get(BffPath.WorkoutId)
  public async show(@Param('id') id: number) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Workouts}/${id}`);
    return data;
  }

  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.OK,
    description: BffMessages.WorkoutIndex
  })
  @Post(BffPath.WorkoutList)
  public async index(@Body() dto: WorkoutQueryDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Workouts}/list`, dto);
    return data;
  }

  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.OK,
    description: BffMessages.WorkoutIndexCount
  })
  @Post(BffPath.WorkoutListCount)
  public async indexCount(@Body() dto: WorkoutQueryDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Workouts}/list/count`, dto);
    return data;
  }

  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.OK,
    description: BffMessages.WorkoutIndex
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post(BffPath.WorkoutCoachList)
  public async coachIndex(@Body() dto: WorkoutCoachQueryDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Workouts}/list/coach`, dto);
    return data;
  }
}