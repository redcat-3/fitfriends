import { NameSpace, AuthorizationStatus } from '../../constant';
import { State } from '../../types/state';
import { User, UserCreate } from '../../types/user-data';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getAuthorizationError = (state: State): boolean => state[NameSpace.User].authorizationError;
export const getAuthCheckedStatus = (state: State): boolean => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;
export const getUsersCount = (state: State): number => state[NameSpace.User].usersCount;
export const getUsersDataLoadingStatus = (state: State): boolean => state[NameSpace.User].isUsersDataLoading;
export const getUsers = (state: State): User[] => state[NameSpace.User].users;
export const getFriendsList = (state: State): User[] => state[NameSpace.User].friendsList;
export const getFeedbackUsers = (state: State): User[] => state[NameSpace.User].feddbackUsers;
export const getUser = (state: State): User => state[NameSpace.User].user;
export const getAuthId = (state: State): string => state[NameSpace.User].authId;
export const getAuthRole = (state: State): string => state[NameSpace.User].authRole;
export const getCoach = (state: State): User => state[NameSpace.User].coach;
export const getReisterData = (state: State): UserCreate | null => state[NameSpace.User].registerData;
