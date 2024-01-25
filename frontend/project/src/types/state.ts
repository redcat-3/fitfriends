import {store} from '../store/index.js';
import {AuthorizationStatus} from '../constant';
import { User, UserCreate, UserRole } from './user-data.js';
import { INotification, Order, OrderToCoach, IRequest, IFeedback, Balance, Feedback } from './reaction.js';
import { Workout } from './workout-data.js';

export type ReactionProcess = {
  notifications: INotification[];
  orders: Order[];
  ordersToCoach: OrderToCoach[];
  isOrdersDataLoading: boolean;
  ordersCount: number;
  ordersToCoachCount: number;
  summaryPrice: number;
  feedbacks: IFeedback[];
  requests: IRequest[];
  balances: Balance[];
};

export type WorkoutProcess = {
  workout: Workout | null;
  isWorkoutDataLoading: boolean;
  workouts: Workout[];
  isWorkoutsDataLoading: boolean;
  workoutsCount: number;
  forYouWorkouts: Workout[];
  specials: Workout[];
  coachWorkouts: Workout[];
}


export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  authorizationError: boolean;
  authId: string;
  authRole: UserRole;
  users: User[];
  isUserDataLoading: boolean;
  user: User;
  coach: User;
  usersCount: number;
  isUsersDataLoading: boolean;
  friendsList: User [];
  isFriendsDataLoading: boolean;
  registerData: UserCreate | null;
  feddbackUsers: User [];
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
