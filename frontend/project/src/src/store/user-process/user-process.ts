import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace, AuthorizationStatus } from '../../constant';
import { UserProcess } from '../../types/state';
import { checkAuthAction, fetchCoachAction, fetchFeedbackUsersAction, fetchFriendsAction, fetchUserAction, fetchUsersAction, loginAction, registerAction } from '../api-actions';
import { UserCreate, UserGender, UserLevel, UserLocation, UserRole } from '../../types/user-data';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  authorizationError: false,
  authId: '',
  authRole: '' as UserRole,
  user: {
    id: '',
    createdDate: '',
    email: '',
    name: '',
    avatar: '',
    gender: '' as UserGender,
    dateBirth: '',
    role: '' as UserRole,
    description: '',
    location: '' as UserLocation,
    image: '',
    level: '' as UserLevel,
    typeOfTrain: [],
    certificates: [],
    trainingReady: false,
    merit: '',
    caloriesToReset: 0,
    caloriesToSpend: 0
  },
  isUserDataLoading: false,
  users: [],
  coach: {
    id: '',
    createdDate: '',
    email: '',
    name: '',
    avatar: '',
    gender: '' as UserGender,
    dateBirth: '',
    role: '' as UserRole,
    description: '',
    location: '' as UserLocation,
    image: '',
    level: '' as UserLevel,
    typeOfTrain: [],
    certificates: [],
    trainingReady: false,
    merit: '',
    caloriesToReset: 0,
    caloriesToSpend: 0
  },
  usersCount: 0,
  isUsersDataLoading: false,
  friendsList: [],
  isFriendsDataLoading: false,
  registerData: null,
  feddbackUsers: []
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setRegisterData: (state, action: PayloadAction<UserCreate | null>) => {
      state.registerData = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.authorizationError = false;
        state.authId = action.payload.id;
        state.authRole = action.payload.role;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.authorizationError = true;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.authorizationError = false;
        state.authId = action.payload.id;
        state.authRole = action.payload.role;
      })
      .addCase(fetchUserAction.pending, (state) => {
        state.isUserDataLoading = true;
      })
      .addCase(fetchUserAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isUserDataLoading = false;
      })
      .addCase(fetchUserAction.rejected, (state) => {
        state.isUserDataLoading = false;
      })
      .addCase(fetchUsersAction.pending, (state) => {
        state.isUsersDataLoading = true;
      })
      .addCase(fetchUsersAction.fulfilled, (state, action) => {
        state.users = action.payload.usersList;
        state.usersCount = action.payload.count;
        state.isUsersDataLoading = false;
      })
      .addCase(fetchUsersAction.rejected, (state) => {
        state.isUsersDataLoading = false;
      })
      .addCase(fetchFriendsAction.pending, (state) => {
        state.isFriendsDataLoading = true;
      })
      .addCase(fetchFriendsAction.fulfilled, (state, action) => {
        state.friendsList = action.payload;
        state.isFriendsDataLoading = false;
      })
      .addCase(fetchFriendsAction.rejected, (state) => {
        state.isFriendsDataLoading = false;
      })
      .addCase(fetchFeedbackUsersAction.fulfilled, (state, action) => {
        state.feddbackUsers = action.payload;
      })
      .addCase(fetchCoachAction.fulfilled, (state, action) => {
        state.coach = action.payload;
      });
  }
});
export const {setRegisterData} = userProcess.actions;
