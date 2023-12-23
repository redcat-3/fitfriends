import { Body, Controller, Delete, Get, Param, Patch, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL, BffPath } from './app.constant';
import { UserIdInterceptor } from './interceptors/userid.interceptor';
import { CreateWorkoutDto, UpdateWorkoutDto } from '@project/shared/shared-dto';
import { WorkoutQueryDto } from '@project/shared/shared-query';

@Controller(BffPath.WorkoutMain)
@UseFilters(AxiosExceptionFilter)
export class WorkoutsController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post(BffPath.WorkoutAdd)
  public async create(@Body() dto: CreateWorkoutDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Workouts}/${BffPath.WorkoutAdd}`, dto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Patch(BffPath.WorkoutId)
  public async update(@Param('id') id: number,
    @Body() dto: UpdateWorkoutDto) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Workouts}/list/coach/${id}`, dto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Delete(BffPath.WorkoutId)
  public async delete(@Param('id') id: number) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Workouts}/list/coach/${id}`);
    return data;
  }


  @Get(BffPath.WorkoutId)
  public async show(@Param('id') id: number) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Workouts}/${BffPath.WorkoutCoachList}/${id}`);
    return data;
  }

  @Post(BffPath.WorkoutList)
  public async index(@Body() dto: WorkoutQueryDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Workouts}/${BffPath.WorkoutList}`, dto);
    return data;
  }

  @Post(BffPath.WorkoutListCount)
  public async indexCount(@Body() dto: WorkoutQueryDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Workouts}/${BffPath.WorkoutListCount}`, dto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Get(BffPath.WorkoutCoachList)
  public async coachIndex() {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Workouts}/${BffPath.WorkoutCoachList}`);
    return data;
  }
}