import { IWorkout } from '@project/shared/shared-types';
import { UserGender, UserLevel, WorkoutType } from '@prisma/client';

export class WorkoutEntity implements IWorkout {
  public workoutId?: number;
  public coachId: string;
  public name: string;
  public background: string;
  public level: UserLevel;
  public type: WorkoutType;
  public timeOfTraining: string;
  public price: number;
  public caloriesToSpend: number;
  public description: string;
  public gender: UserGender;
  public video: string;
  public rating: number;
  public special: boolean;
  public createdDate: string;

  constructor(workoutData: IWorkout) {
    this.fillEntity(workoutData);
}

  public toObject() {
    return {...this};
  }

  public fillEntity(workoutData: IWorkout) {
    this.workoutId = workoutData.workoutId;
    this.coachId = workoutData.coachId;
    this.name = workoutData.name;
    this.background = workoutData.background;
    this.level = workoutData.level;
    this.type = workoutData.type;
    this.timeOfTraining = workoutData.timeOfTraining;
    this.price = workoutData.price;
    this.caloriesToSpend = workoutData.caloriesToSpend;
    this.description = workoutData.description;
    this.gender = workoutData.gender;
    this.video = workoutData.video;
    this.rating = workoutData.rating;
    this.special = workoutData.special;
    this.createdDate = workoutData.createdDate;
  }
}
