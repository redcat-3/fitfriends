import { Body, Req, Controller, HttpStatus,
  Param, Post, Delete, Patch, UseGuards, Get, Query } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { API_TAG_NAME, WorkoutMessages, WorkoutPath, WorkoutsError } from './workout.constant';
import { WorkoutRdo } from './rdo/workout.rdo';
import { CreateWorkoutDto, UpdateWorkoutDto } from '@project/shared/shared-dto';
import { CreateWorkoutValidationPipe } from './pipes/create-workout-validation.pipe';
import { UpdateWorkoutValidationPipe } from './pipes/update-workout-validation.pipe';
import { JwtAuthGuard, fillObject } from '@project/util/util-core';
import { RequestWithUserPayload } from '@project/shared/shared-types';
import { WorkoutQuery } from '@project/shared/shared-query';


@ApiTags(API_TAG_NAME)
@ApiExtraModels(CreateWorkoutDto, UpdateWorkoutDto)
@Controller(WorkoutPath.Main)
export class WorkoutController {
  constructor(
    private readonly workoutsService: WorkoutService
  ) { }

  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.CREATED,
    description: WorkoutMessages.Add,
  })
  @UseGuards(JwtAuthGuard)
  @Post(WorkoutPath.Add)
  public async create(
    @Req() { user }: RequestWithUserPayload,
    @Body(CreateWorkoutValidationPipe)
    dto: CreateWorkoutDto) {
    const userId = user.sub;
    const workout = await this.workoutsService.create(dto, userId);
    return fillObject(WorkoutRdo, workout);
  }

  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.OK,
    description: WorkoutMessages.Update,
  })
  @UseGuards(JwtAuthGuard)
  @Patch(WorkoutPath.Id)
  public async update(@Req() { user }: RequestWithUserPayload,
    @Param('id') id: number,
    @Body(UpdateWorkoutValidationPipe)
    dto: UpdateWorkoutDto) {
    const userId = user.sub;
    const workout = await this.workoutsService.update(id, dto, userId);
    return fillObject(WorkoutRdo, workout);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: WorkoutMessages.Remove,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: WorkoutsError.Delete
  })
  @UseGuards(JwtAuthGuard)
  @Delete(WorkoutPath.Id)
  public async delete(@Param('id') id: number,
    @Req() { user }: RequestWithUserPayload) {
    const userId = user.sub;
    return await this.workoutsService.remove(id, userId);
  }

  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.OK,
    description: WorkoutMessages.Show
  })
  @UseGuards(JwtAuthGuard)
  @Get(WorkoutPath.Id)
  public async show(@Param('id') id: string) {
    const workout =  await this.workoutsService.findByWorkoutId(+id);
    return fillObject(WorkoutRdo, workout);
  }

  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.OK,
    description: WorkoutMessages.Index
  })
  @UseGuards(JwtAuthGuard)
  @Get(WorkoutPath.List)
  public async index(@Query() query : WorkoutQuery) {
    const workouts = await this.workoutsService.findAll(query);
    return workouts.map((workout) => fillObject(WorkoutRdo, workout));
  }

  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.OK,
    description: WorkoutMessages.Index
  })
  @UseGuards(JwtAuthGuard)
  @Get(WorkoutPath.CoachList)
  public async coachIndex(@Req() { user }: RequestWithUserPayload) {
    const workouts = await this.workoutsService.findByCoachId(user.sub);
    return workouts.map((workout) => fillObject(WorkoutRdo, workout));
  }
}
