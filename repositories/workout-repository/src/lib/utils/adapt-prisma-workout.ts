import { Workout } from "@prisma/client";
import { IWorkout, UserTime } from "@project/shared/shared-types";

export function adaptPrismaWorkout(prismaWorkout: Workout | null): IWorkout {
  if (prismaWorkout) {
    const workout = {
      ...prismaWorkout,
      createdDate: prismaWorkout.createdDate.toISOString(),
      timeOfTraining: prismaWorkout.timeOfTraining as UserTime
    };
    return workout;
  }
  return null;
}
