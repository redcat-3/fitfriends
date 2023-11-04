import { CRUDRepository } from '@project/util/util-types';
import { IWorkout } from '@project/shared/shared-types';
import { WorkoutQuery } from '@project/shared/shared-query';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { WorkoutEntity } from './entities/workout.entity';
import { adaptPrismaWorkout } from './utils/adapt-prisma-workout';

@Injectable()
export class WorkoutRepository implements CRUDRepository<WorkoutEntity, number, IWorkout> {
  constructor( private readonly prisma: PrismaService ) { }

  public async create(item:  WorkoutEntity): Promise<IWorkout> {
    const workout: Prisma.WorkoutCreateInput = {
      ...item.toObject(),
    }
    const createdWorkout = await this.prisma.workout.create({data: workout});
    return adaptPrismaWorkout(createdWorkout);
  }

  public async findById(workoutId: number): Promise<IWorkout | null> {
    const workout = await this.prisma.workout.findFirst({
      where: {
        workoutId
      },
      include: {
        feedbacks: true,
        orders: true,
      },
    });
    return adaptPrismaWorkout(workout);
  }

  public async findAll({ limit, page, sortBy, caloriesToSpend, sortDirection, price, timeOfTraining, rating }: WorkoutQuery): Promise<IWorkout[]> {
    const queryParams = {
      where: {
        AND: {
          price,
          timeOfTraining,
          caloriesToSpend,
          rating
        }
      },
      take: limit,
      include: {
        feedbacks: true,
        orders: true,
      },
      orderBy: [
        { [sortBy]: sortDirection }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    }
    const workouts = await this.prisma.workout.findMany(queryParams);
    return workouts.map((workout) => adaptPrismaWorkout(workout))
  }

  public async searchByUserId( userId: string ): Promise<IWorkout[]> {
    const queryParams = {
      where: {
        coachId: userId,
      }
    }
    const workouts = await this.prisma.workout.findMany(queryParams);
    return workouts.map((workout) => adaptPrismaWorkout(workout))
  }

  public async update(workoutId: number, item: WorkoutEntity): Promise<IWorkout> {
    const data = {
      ...item.toObject(),
    }
    const workout = await this.prisma.workout.update({
      where: { workoutId },
      data,
      include: {
        feedbacks: true,
        orders: true,
      }
    });
    return adaptPrismaWorkout(workout)
  }

  public async addFeedback(workoutId: number, newRating: number): Promise<IWorkout| null> {
    const currentWorkout = await this.prisma.workout.findFirst({
      where:{
        workoutId
      },
      include: {
        feedbacks: true,
      }
    });
    if (!currentWorkout) {
      return null;
    }
    const rating = Math.round((currentWorkout.rating + newRating) * 100 / currentWorkout.feedbacks.length / 100);
    const workout = await this.prisma.workout.update({
      where:{
        workoutId
      },
      data: {
        rating
      }
     });
     
    return adaptPrismaWorkout(workout);
  }

  public async destroy(workoutId: number): Promise<void> {
    await this.prisma.workout.delete({ where: { workoutId } });
  }
}
