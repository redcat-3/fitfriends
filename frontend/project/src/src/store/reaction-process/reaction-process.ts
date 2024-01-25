import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constant';
import { ReactionProcess } from '../../types/state';
import { fetchBalancesAction, 
  fetchFeedbacksWorkoutAction, 
  fetchNotificationsAction, 
  fetchOrdersCoachAction, 
  fetchOrdersUserAction, 
  fetchOrdersWorkoutAction, 
  fetchRequestsAction} from '../api-actions';

const initialState: ReactionProcess = {
  notifications: [],
  orders: [],
  isOrdersDataLoading: false,
  ordersCount: 0,
  ordersToCoach: [],
  ordersToCoachCount: 0,
  summaryPrice: 0,
  feedbacks: [],
  requests: [],
  balances: []
};

export const reactionProcess = createSlice({
  name: NameSpace.Reaction,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(fetchOrdersWorkoutAction.pending, (state) => {
      state.isOrdersDataLoading = true;
    })
    .addCase(fetchOrdersWorkoutAction.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.ordersCount = state.orders.length;
      state.isOrdersDataLoading = false;
    })
    .addCase(fetchOrdersWorkoutAction.rejected, (state) => {
      state.isOrdersDataLoading = false;
    })
    .addCase(fetchOrdersUserAction.pending, (state) => {
      state.isOrdersDataLoading = true;
    })
    .addCase(fetchOrdersUserAction.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.ordersCount = state.orders.length;
      state.isOrdersDataLoading = false;
    })
    .addCase(fetchOrdersUserAction.rejected, (state) => {
      state.isOrdersDataLoading = false;
    })
    .addCase(fetchOrdersCoachAction.pending, (state) => {
      state.isOrdersDataLoading = true;
    })
    .addCase(fetchOrdersCoachAction.fulfilled, (state, action) => {
      state.ordersToCoach = action.payload.orders;
      state.ordersToCoachCount = state.ordersToCoach.length;
      state.summaryPrice = action.payload.summaryPrice;
      state.isOrdersDataLoading = false;
    })
    .addCase(fetchOrdersCoachAction.rejected, (state) => {
      state.isOrdersDataLoading = false;
    })
    .addCase(fetchFeedbacksWorkoutAction.fulfilled, (state, action) => {
      state.feedbacks = action.payload;
    })
    .addCase(fetchRequestsAction.fulfilled, (state, action) => {
      state.requests = action.payload;
    })
    .addCase(fetchNotificationsAction.fulfilled, (state, action) => {
      state.notifications = action.payload;
    })
    .addCase(fetchBalancesAction.fulfilled, (state, action) => {
      state.balances = action.payload;
    })
  }
});
export const {} = reactionProcess.actions;
