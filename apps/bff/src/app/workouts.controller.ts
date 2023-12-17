import { Body, Controller, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { UserIdInterceptor } from './interceptors/userid.interceptor';
import { CreateWorkoutDto } from '@project/shared/shared-dto';

@Controller('workouts')
@UseFilters(AxiosExceptionFilter)
export class WorkoutsController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('/')
  public async create(@Body() dto: CreateWorkoutDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Workouts}/`, dto);
    return data;
  }

}