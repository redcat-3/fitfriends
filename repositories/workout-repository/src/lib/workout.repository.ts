import { CRUDRepository } from '@project/util/util-types';
import { IWorkout } from '@project/shared/shared-types';
import { WorkoutQuery } from '@project/shared/shared-query';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { WorkoutEntity } from './entities/workout.entity';
import { adaptPrismaWorkout } from './utils/adapt-prisma-workout';
import { buildFilterQuery } from './utils/build-filter-query';

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

  public async findAll(query: WorkoutQuery): Promise<IWorkout[]> {
    const queryParams = buildFilterQuery(query);
    const workouts = await this.prisma.workout.findMany(queryParams);
    return workouts.map((workout) => adaptPrismaWorkout(workout))
  }

  public async searchByUserIdWithFilters( userId: string, price: string, calories: string, rating: string, duration: string ): Promise<IWorkout[]> {
    const [priceMin, priceMax] = price.split(",");
    const [caloriesMin, caloriesMax] = calories.split(",");
    const [ratingMin, ratingMax] = rating.split(",");
    const times = duration.split(",");
    const queryParams = {
      where: {
        AND: [
          {
            price: {
              gte: +priceMin,
              lte: +priceMax,
            },
          },
          {
            coachId: userId,
          },
          {
            caloriesToSpend: {
              gte: +caloriesMin,
              lte: +caloriesMax,
            },
          },
          {
            rating: {
              gte: +ratingMin,
              lte: +ratingMax,
            },
          },
          {
            timeOfTraining: {
              in: times,
            },
          }
        ]
      },
      include: {
        feedbacks: true,
        orders: true,
      },
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
