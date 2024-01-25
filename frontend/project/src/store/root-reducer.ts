import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace} from '../constant';
import { userProcess } from './user-process/user-process';
import { reactionProcess } from './reaction-process/reaction-process';
import { workoutProcess } from './workout-process/workout-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Reaction]: reactionProcess.reducer,
  [NameSpace.Workout]: workoutProcess.reducer,
});
