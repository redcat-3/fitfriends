import { Body, Controller, Delete, Get, Param, Patch, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL, WorkoutPath } from './app.constant';
import { UserIdInterceptor } from './interceptors/userid.interceptor';
import { CreateWorkoutDto, UpdateWorkoutDto } from '@project/shared/shared-dto';

@Controller('workouts')
@UseFilters(AxiosExceptionFilter)
export class WorkoutsController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post(WorkoutPath.Add)
  public async create(@Body() dto: CreateWorkoutDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Workouts}/add`, dto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Patch(WorkoutPath.Id)
  public async update(@Param('id') id: number,
    @Body() dto: UpdateWorkoutDto) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Workouts}/${id}`, dto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Delete(WorkoutPath.Id)
  public async delete(@Param('id') id: number) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Workouts}/${id}`);
    return data;
  }

  @UseInterceptors(UserIdInterceptor)
  @Get(WorkoutPath.Id)
  public async show(@Param('id') id: number) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Workouts}/${id}`);
    return data;
  }

  // @UseInterceptors(UserIdInterceptor)
  // @Get(WorkoutPath.List)
  // public async index(@Body() dto: WorkoutQuery) {
  //   const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Workouts}/list`, dto);
  //   return data;
  // }
}