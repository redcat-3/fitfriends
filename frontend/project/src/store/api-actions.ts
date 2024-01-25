import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { saveRefreshToken, saveToken } from '../services/token';
import { APIRoute, AppRoute } from '../constant';
import { AuthData } from '../types/auth-data';
import { LoggedUser, User, UserCreate, UserRole, UserUpdate } from '../types/user-data';
import { FeedbackQueryDto, OrderQueryDto, UserQuery, WorkoutQueryDto } from '../types/query.js';
import { Workout, WorkoutCreate, WorkoutUpdate } from '../types/workout-data.js';
import { Balance, FeedbackCreate, IFeedback, INotification, IRequest, Order, OrderCreate, OrderToCoach, RequestStatus } from '../types/reaction.js';
import { redirectToRoute } from './action.js';

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    await api.get(APIRoute.Login);
  },
);

export const registerAction = createAsyncThunk<User, UserCreate, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/register', async (newUser, {dispatch, extra: api}) => {
  const {data} = await api.post<User>(`${APIRoute.Register}`, newUser);
  return data;
});

export const loginAction = createAsyncThunk<{id: string, role: UserRole}, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data: {accessToken, refreshToken, id, role}} = await api.post<LoggedUser>(APIRoute.Login, {email, password});
    saveToken(accessToken);
    saveRefreshToken(refreshToken);
    return {id, role};
  },
);

export const fetchUsersAction = createAsyncThunk<{usersList: User[], count: number}, UserQuery, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/fetchUsers', async (dto, {dispatch, extra: api}) => {
  const {data} = await api.post<{usersList: User[], count: number}>(`${APIRoute.Users}/user-list`, dto);
  return data;
});

export const fetchFeedbackUsersAction = createAsyncThunk<User[], string[], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/fetchFeedbackUsers', async (ids, {dispatch, extra: api}) => {
  const {data} = await api.post<User[]>(`${APIRoute.Users}/list/friends/feedbacks`, ids);
  return data;
});

export const fetchUserAction = createAsyncThunk<User, string , {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/fetchUser', async (id, {dispatch, extra: api}) => {
  const {data} = await api.get<User>(`${APIRoute.Users}/list/friends/${id}`);
  return data;
});

export const fetchCoachAction = createAsyncThunk<User, { id: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/fetchUserCoach', async ({id}, {dispatch, extra: api}) => {
  const {data} = await api.get<User>(`${APIRoute.Users}/list/friends/coach${id}`);
  return data;
});

export const fetchFriendsAction = createAsyncThunk<User[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/fetchFriends', async (_arg, {dispatch, extra: api}) => {
  const {data} = await api.get<User[]>(APIRoute.Friends);
  return data;
});

export const fetchUserUpdateAction = createAsyncThunk<User, UserUpdate, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/fetchUserUpdate', async (user, {dispatch, extra: api}) => {
  const {data} = await api.patch<User>(`${APIRoute.Users}/list/friends/${user.id}`, user);
  return data;
});

export const fetchFollowAction = createAsyncThunk<User, { id: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/fetchFolow', async (id, {dispatch, extra: api}) => {
  const {data} = await api.patch<User>(`${APIRoute.Users}/list/friends/follow/${id}`);
  return data;
});

export const fetchUnfollowAction = createAsyncThunk<User, { id: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/fetchUnfollow', async (id, {dispatch, extra: api}) => {
  const {data} = await api.patch<User>(`${APIRoute.Users}/list/friends/unfollow/${id}`);
  return data;
});

export const fetchAddFriendAction = createAsyncThunk<User, { id: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/fetchAddFriend', async (id, {dispatch, extra: api}) => {
  const {data} = await api.patch<User>(`${APIRoute.Users}/list/friends/add/${id}`);
  return data;
});

export const fetchRemoveFriendAction = createAsyncThunk<User, { id: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/fetchRemoveFriend', async (id, {dispatch, extra: api}) => {
  const {data} = await api.patch<User>(`${APIRoute.Users}/list/friends/remove/${id}`);
  return data;
});

export const fetchWorkoutAddAction = createAsyncThunk<Workout, WorkoutCreate, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('workout/fetchWorkoutAdd', async (newWorkout, {dispatch, extra: api}) => {
  const {data} = await api.post<Workout>(`${APIRoute.Workouts}/add`, newWorkout);
  return data;
});

export const fetchWorkoutUpdateAction = createAsyncThunk<Workout, WorkoutUpdate, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('workout/fetchWorkoutAdd', async (workout, {dispatch, extra: api}) => {
  const {data} = await api.patch<Workout>(`${APIRoute.Workouts}/update`, workout);
  return data;
});

export const fetchWorkoutAction = createAsyncThunk<Workout, { id: number }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('workout/fetchWorkout', async ({id}, {dispatch, extra: api}) => {
  const {data} = await api.get<Workout>(`${APIRoute.Workouts}/list/coach/${id}`);
  return data;
});

export const fetchWorkoutsAction = createAsyncThunk<{workoutsList: Workout[], count: number}, WorkoutQueryDto, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('workout/fetchWorkouts', async (query, {dispatch, extra: api}) => {
  const {data} = await api.post<{workoutsList: Workout[], count: number}>(`${APIRoute.Workouts}/list`, query);
  return data;
});

export const fetchWorkoutsCoachAction = createAsyncThunk<Workout[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('workout/fetchWorkoutsCoach', async (_arg, {dispatch, extra: api}) => {
  const {data} = await api.get<Workout[]>(`${APIRoute.Workouts}/list/coach`);
  return data;
});

export const fetchWorkoutsCoachQueryAction = createAsyncThunk<Workout[], WorkoutQueryDto, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('workout/fetchWorkoutsCoachQuery', async (dto, {dispatch, extra: api}) => {
  const {data} = await api.post<Workout[]>(`${APIRoute.Workouts}/list/coach`, dto);
  return data;
});

export const fetchWorkoutDeleteAction = createAsyncThunk<void, { id: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('workout/fetchWorkoutDelete',
  async (id, {dispatch, extra: api}) => {
    await api.delete(`${APIRoute.Workouts}/list/coach/${id}`);
  },
);

export const fetchOrderAddAction = createAsyncThunk<Order, OrderCreate, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('order/fetchOrderAdd', async (newOrder, {dispatch, extra: api}) => {
  const {data} = await api.post<Order>(`${APIRoute.Orders}/add`, newOrder);
  return data;
});

export const fetchOrdersWorkoutAction = createAsyncThunk<Order[], {query: OrderQueryDto, id: number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('order/fetchOrdersWorkout', async ({query, id}, {dispatch, extra: api}) => {
  const {data} = await api.post<Order[]>(`${APIRoute.Orders}/list/${id}`, query);
  return data;
});

export const fetchOrderAction = createAsyncThunk<Order, {id: number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('order/fetchOrder', async ({id}, {dispatch, extra: api}) => {
  const {data} = await api.get<Order>(`${APIRoute.Orders}/${id}`);
  return data;
});

export const fetchOrdersCoachAction = createAsyncThunk<{orders: OrderToCoach[], summaryPrice: number}, {query: OrderQueryDto}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('order/fetchOrdersCoach', async (query, {dispatch, extra: api}) => {
  const {data} = await api.post<{orders: OrderToCoach[], summaryPrice: number}>(`${APIRoute.Orders}/coach/list/index`, query);
  return data;
});

export const fetchOrdersUserAction = createAsyncThunk<Order[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('order/fetchOrdersUser', async (_arg, {dispatch, extra: api}) => {
  const {data} = await api.get<Order[]>(`${APIRoute.Orders}/user/list/index`);
  return data;
});

export const fetchFeedbackAddAction = createAsyncThunk<IFeedback, FeedbackCreate, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('feedback/fetchFeedbackAdd', async (newFeedback, {dispatch, extra: api}) => {
  const {data} = await api.post<IFeedback>(`${APIRoute.Feedbacks}/add`, newFeedback);
  return data;
});

export const fetchFeedbacksWorkoutAction = createAsyncThunk<IFeedback[], {query: FeedbackQueryDto, id: number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('feedback/fetchFeedbacksWorkout', async ({query, id}, {dispatch, extra: api}) => {
  const {data} = await api.post<IFeedback[]>(`${APIRoute.Feedbacks}/list/${id}`, query);
  return data;
});

export const fetchFeedbackAction = createAsyncThunk<IFeedback, {id: number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('feedback/fetchFeedback', async ({id}, {dispatch, extra: api}) => {
  const {data} = await api.get<IFeedback>(`${APIRoute.Feedbacks}/${id}`);
  return data;
});

export const fetchRequestAddAction = createAsyncThunk<IRequest, {userId: string}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('request/fetchRequestAdd', async (newRequest, {dispatch, extra: api}) => {
  const {data} = await api.post<IRequest>(`${APIRoute.Requests}/add`, newRequest);
  return data;
});

export const fetchRequestUpdateAction = createAsyncThunk<IRequest, {id: number, status: RequestStatus}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('request/fetchRequestUpdate', async ({id, status}, {dispatch, extra: api}) => {
  const {data} = await api.patch<IRequest>(`${APIRoute.Requests}/${id}`, status);
  return data;
});

export const fetchRequestAction = createAsyncThunk<IRequest, {id: number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('request/fetchRequest', async (id, {dispatch, extra: api}) => {
  const {data} = await api.get<IRequest>(`${APIRoute.Requests}/${id}`);
  return data;
});

export const fetchRequestsAction = createAsyncThunk<IRequest[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('request/fetchRequests', async (_arg, {dispatch, extra: api}) => {
  const {data} = await api.get<IRequest[]>(`${APIRoute.Requests}/list/input`);
  return data;
});

export const fetchMyRequestsAction = createAsyncThunk<IRequest[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('request/fetchMyRequests', async (_arg, {dispatch, extra: api}) => {
  const {data} = await api.get<IRequest[]>(`${APIRoute.Requests}/list/requester`);
  return data;
});

export const fetchRequestDeleteAction = createAsyncThunk<void, {id: number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('request/fetchRequestDelete', async (id, {dispatch, extra: api}) => {
  const {data} = await api.delete(`${APIRoute.Requests}/${id}`);
  return data;
});

export const fetchNotificationAction = createAsyncThunk<INotification, {id: number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('notification/fetchNotification', async (id, {dispatch, extra: api}) => {
  const {data} = await api.get<INotification>(`${APIRoute.Notifications}/${id}`);
  return data;
});

export const fetchNotificationsAction = createAsyncThunk<INotification[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('notification/fetchNotifications', async (_arg, {dispatch, extra: api}) => {
  const {data} = await api.get<INotification[]>(`${APIRoute.Notifications}/list`);
  return data;
});

export const fetchNotificationDeleteAction = createAsyncThunk<void, {id: number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('notification/fetchNotificationDelete', async (id, {dispatch, extra: api}) => {
  const {data} = await api.delete(`${APIRoute.Notifications}/${id}`);
  return data;
});

export const fetchBalanceUpdateAction = createAsyncThunk<Balance, Balance, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('balance/fetchBalanceUpdate', async (newBalance, {dispatch, extra: api}) => {
  const {data} = await api.patch<Balance>(`${APIRoute.Balances}/update`, newBalance);
  return data;
});

export const fetchBalanceAction = createAsyncThunk<Balance, {id: number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('balance/fetchBalance', async (id, {dispatch, extra: api}) => {
  const {data} = await api.get<Balance>(`${APIRoute.Balances}/list/${id}`);
  return data;
});

export const fetchBalancesAction = createAsyncThunk<Balance[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('balance/fetchBalances', async (id, {dispatch, extra: api}) => {
  const {data} = await api.get<Balance[]>(`${APIRoute.Balances}/list`);
  return data;
});

export const fetchBalanceDeleteAction = createAsyncThunk<void, {id: number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('balance/fetchBalanceDelete', async (id, {dispatch, extra: api}) => {
  const {data} = await api.delete(`${APIRoute.Balances}/list/${id}`);
  return data;
});