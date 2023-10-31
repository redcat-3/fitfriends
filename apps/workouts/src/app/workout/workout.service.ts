import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { WorkoutRepository } from '@project/repositories/workout-repository';
import { UserRepository } from '@project/repositories/user-repository';
import { WorkoutsError } from './workout.constant';
import { CreateWorkoutDto, UpdateWorkoutDto, DEFAULT_AMOUNT } from '@project/shared/shared-dto';
import { getDate } from '@project/util/util-core';
import { WorkoutEntity } from '@project/repositories/workout-repository';
import { UserRole } from '@project/shared/shared-types';
import { WorkoutQuery } from '@project/shared/shared-query';

@Injectable()
export class WorkoutService {
  constructor(
    private readonly workoutRepository: WorkoutRepository,
    private readonly userRepository: UserRepository,
  ) { }

  public async create(dto: CreateWorkoutDto, coachId: string) {
    const workout = {
      ...dto,
      coachId,
      createdDate: getDate(),
      rating: DEFAULT_AMOUNT,
    };
    const workoutEntity = await new WorkoutEntity(workout);
    return this.workoutRepository.create(workoutEntity);
  }

  public async update(workoutId: number, dto: UpdateWorkoutDto, coachId: string) {
    const workout = await this.findByWorkoutId(workoutId);
    if (coachId !== workout.coachId) {
      throw new BadRequestException(WorkoutsError.NotUserAuthor)
    }
    const updatedWorkout = { ...workout, ...dto };
    const workoutEntity = await new WorkoutEntity(updatedWorkout);
    return this.workoutRepository.update(workoutId, workoutEntity);
  }

  public async findByWorkoutId(id: number) {
    const workout = await this.workoutRepository.findById(id);
    if (!workout) {
      throw new NotFoundException(WorkoutsError.WorkoutNotFound);
    }
    return workout;
  }

  public async findByCoachId(coachId: string) {
    const coach = await this.userRepository.findById(coachId);
    if (!coach) {
      throw new NotFoundException(WorkoutsError.UserNotFound);
    } 
    if (coach.role !== UserRole.Сoach) {
      throw new BadRequestException(WorkoutsError.WrongRole);
    }
    const workouts = await this.workoutRepository.searchByUserId(coachId);
    return workouts;
  }

  public async findAll(query: WorkoutQuery) {
    const workouts = await this.workoutRepository.findAll(query);
    return workouts;
  }

  public async remove(workoutId: number, coachId: string) {
    const workout = await this.findByWorkoutId(workoutId);
    if (coachId !== workout.coachId) {
      throw new BadRequestException(WorkoutsError.NotUserAuthor)
    }
    return this.workoutRepository.destroy(workoutId);
  }
}
