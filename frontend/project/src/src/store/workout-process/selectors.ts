import { State } from '../../types/state';
import { NameSpace } from '../../constant';
import { Workout, WorkoutCreate } from '../../types/workout-data';

export const getWorkouts = (state: State): Workout [] => state[NameSpace.Workout].workouts;
export const getForYou = (state: State): Workout [] => state[NameSpace.Workout].forYouWorkouts;
export const getSpecials = (state: State): Workout [] => state[NameSpace.Workout].specials;
export const getCoachWorkouts = (state: State): Workout [] => state[NameSpace.Workout].coachWorkouts;
export const getWorkout = (state: State): Workout | null => state[NameSpace.Workout].workout;
export const getWorkoutsDataLoadingStatus = (state: State): boolean => state[NameSpace.Workout].isWorkoutsDataLoading;
export const getWorkoutsCount = (state: State): number => state[NameSpace.Workout].workoutsCount;