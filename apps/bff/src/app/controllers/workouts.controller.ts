import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL, BffError, BffMessages, BffPath } from '../app.constant';
import { CreateWorkoutDto, UpdateWorkoutDto } from '@project/shared/shared-dto';
import { WorkoutQueryDto } from '@project/shared/shared-query';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(BffPath.WorkoutMain)
@Controller(BffPath.WorkoutMain)
@UseFilters(AxiosExceptionFilter)
export class WorkoutsController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: BffMessages.WorkoutAdd,
  })
  @UseGuards(CheckAuthGuard)
  @Post(BffPath.Add)
  public async create(@Req() req:Request, @Body() dto: CreateWorkoutDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Workouts}/${BffPath.Add}`, dto, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BffMessages.WorkoutUpdate,
  })
  @UseGuards(CheckAuthGuard)
  @Patch(BffPath.WorkoutId)
  public async update(@Req() req:Request,
    @Param('id') id: number,
    @Body() dto: UpdateWorkoutDto) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Workouts}/list/coach/${id}`, dto, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
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
  @Delete(BffPath.WorkoutId)
  public async delete(@Req() req:Request, @Param('id') id: number) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Workouts}/list/coach/${id}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BffMessages.WorkoutShow
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BffError.WorkoutNotFound
  })
  @UseGuards(CheckAuthGuard)
  @Get(BffPath.WorkoutId)
  public async show(@Req() req:Request, @Param('id') id: number) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Workouts}/${BffPath.WorkoutCoachList}/${id}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BffMessages.WorkoutIndex
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BffError.WorkoutEmptyList
  })
  @Post(BffPath.List)
  public async index(@Req() req:Request, @Body() dto: WorkoutQueryDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Workouts}/${BffPath.List}`, dto, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BffMessages.WorkoutIndex
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BffError.WorkoutEmptyList
  })
  @UseGuards(CheckAuthGuard)
  @Get(BffPath.WorkoutCoachList)
  public async coachIndex(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Workouts}/${BffPath.WorkoutCoachList}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }
}