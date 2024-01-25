import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constant';
import { WorkoutProcess } from '../../types/state';
import { fetchWorkoutAction, fetchWorkoutsAction, fetchWorkoutsCoachAction, fetchWorkoutsCoachQueryAction } from '../api-actions';

const initialState: WorkoutProcess = {
  workout: null,
  isWorkoutDataLoading: false,
  workouts: [],
  isWorkoutsDataLoading: false,
  workoutsCount: 0,
  forYouWorkouts: [],
  specials: [],
  coachWorkouts: []
};

export const workoutProcess = createSlice({
  name: NameSpace.Workout,
  initialState,
  reducers: {
    setForYou: (state) => {
      if(state.workouts.length !== 0) {
        state.forYouWorkouts = state.workouts;
      }
    },
    setSpecials: (state) => {
      if(state.workouts.length !== 0) {
        state.specials = state.workouts;
      }
    }
  },
  extraReducers(builder) {
    builder
    .addCase(fetchWorkoutAction.pending, (state) => {
      state.isWorkoutDataLoading = true;
    })
    .addCase(fetchWorkoutAction.fulfilled, (state, action) => {
      state.workout = action.payload;
      state.isWorkoutDataLoading = false;
    })
    .addCase(fetchWorkoutAction.rejected, (state) => {
      state.isWorkoutDataLoading = false;
    })
    .addCase(fetchWorkoutsAction.pending, (state) => {
      state.isWorkoutsDataLoading = true;
    })
    .addCase(fetchWorkoutsAction.fulfilled, (state, action) => {
      state.workouts = action.payload.workoutsList;
      state.workoutsCount = action.payload.count;
      state.isWorkoutsDataLoading = false;
    })
    .addCase(fetchWorkoutsAction.rejected, (state) => {
      state.isWorkoutsDataLoading = false;
    })
    .addCase(fetchWorkoutsCoachAction.pending, (state) => {
      state.isWorkoutsDataLoading = true;
    })
    .addCase(fetchWorkoutsCoachAction.fulfilled, (state, action) => {
      state.coachWorkouts = action.payload;
      state.isWorkoutsDataLoading = false;
    })
    .addCase(fetchWorkoutsCoachAction.rejected, (state) => {
      state.isWorkoutsDataLoading = false;
    })
    .addCase(fetchWorkoutsCoachQueryAction.fulfilled, (state, action) => {
      state.coachWorkouts = action.payload;
    })
  }
});
export const {setForYou, setSpecials} = workoutProcess.actions;
