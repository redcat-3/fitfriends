export const DEFAULT_COUNT_LIMIT = 10;
export const DEFAULT_SORT_DIRECTION = 'desc';
export const DEFAULT_AMOUNT = 0;
export const DEFAULT_STATUS = false;
export const API_TAG_NAME ='Workouts';

export const WorkoutsError = {
  WorkoutNotFound : 'Workout is not found',
  Delete : 'Workout is not deleted',
  WrongType : 'Wrong Workout type',
  NotUserAuthor:'User is not an author of this Workout',
  UserNotFound : 'User is not found',
  WrongRole : 'User role is wrong',
} as const;

export const WorkoutMessages = {
  Add : "Workout added successfully",
  Show : "Workout is showing",
  Index : "Workouts are showing",
  IndexCount : "Count of workouts are showing",
  Update : "Workout updated",
  Remove: "Workout removed"
} as const;

export const WorkoutPath = {
  Main: 'workout',
  Add: 'add',
  List: 'list',
  ListCount: 'list/count',
  CoachList: 'list/coach',
  CoachListWithFilters: 'list/coach/:price/:calories/:rating/:duration',
  Id: 'list/coach/:id'
}as const;

export const VALIDATION_ARGUMENT_TYPE = 'body';