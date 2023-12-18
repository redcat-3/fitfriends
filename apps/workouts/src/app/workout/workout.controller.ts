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
import { NotifyService } from '../notify/notify.service';
import { NotificationEntity, NotificationRepository } from '@project/repositories/notification-repository';
import dayjs from 'dayjs';


@ApiTags(API_TAG_NAME)
@ApiExtraModels(CreateWorkoutDto, UpdateWorkoutDto)
@Controller(WorkoutPath.Main)
export class WorkoutController {
  constructor(
    private readonly workoutsService: WorkoutService,
    private readonly notifyService: NotifyService,
    private readonly notificationRepository: NotificationRepository,
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
    const result = await this.workoutsService.create(dto, userId);
    if (result && (result.followers.length > 0)) {
      result.followers.map((follower) => {
        this.notifyService.sendNewsletter({
          email: follower.email,
          workoutInfo: result.newWorkout,
          name: follower.name,
          coach: result.coach.name,
        });
        const notification = {
          userId: follower.id,
          text: `Тренер ${result.coach.name} приглашает вас на тренировку с названием ${result.newWorkout.name}`,
          createdDate: dayjs().toDate(),
        }
        const notificationEntity = new NotificationEntity(notification);
        this.notificationRepository.create(notificationEntity);
      })
    }
    return fillObject(WorkoutRdo, result.newWorkout);
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
  public async show(@Param('id') id: number) {
    const workout =  await this.workoutsService.findByWorkoutId(id);
    return fillObject(WorkoutRdo, workout);
  }

  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.OK,
    description: WorkoutMessages.Index
  })
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

  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.OK,
    description: WorkoutMessages.Index
  })
  @UseGuards(JwtAuthGuard)
  @Get(WorkoutPath.CoachListWithFilters)
  public async coachIndexWithFilters(
    @Req() { user }: RequestWithUserPayload, 
    @Param('price') price: string,
    @Param('calories') calories: string, 
    @Param('rating') rating: string, 
    @Param('duration') duration: string) {
    const workouts = await this.workoutsService.findByCoachIdWithFilters(user.sub, price, calories, rating, duration);
    return workouts.map((workout) => fillObject(WorkoutRdo, workout));
  }
}
