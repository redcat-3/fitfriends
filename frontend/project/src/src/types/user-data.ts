export enum UserGender {
  Male = 'male',
  Female = 'female',
  Indifferent = 'indifferent',
};

export enum UserRole {
  User = 'user',
  Coach = 'coach',
};

export enum UserLocation {
  Pion = 'Пионерская',
  Petr = 'Петроградская',
  Udel = 'Удельная',
  Star = 'Звёздная',
  Sport = 'Спортивная',
};

export enum UserLevel {
  Beginner = 'beginner',
  Ethusiast = 'ethusiast',
  Pro = 'pro'
};

export enum UserTime {
  One = '10-30',
  Two = '30-50',
  Three = '50-80',
  Four = '80-100',
};

export type LoggedUser = {
  id: string;
  role: UserRole;
  accessToken: string;
  refreshToken: string;
};

export type User = UserUser | UserCoach;

export type UserUser = {
  id: string;
  email: string;
  name: string;
  avatar: string;
  createdDate: string;
  gender: UserGender;
  dateBirth: string;
  role: UserRole;
  description: string;
  location: UserLocation;
  image?: string;
  level: UserLevel;
  typeOfTrain: string[];
  timeOfTrain?: UserTime;
  caloriesToReset: number;
  caloriesToSpend: number;
  trainingReady: boolean;
};

export type UserCoach = {
  id: string;
  email: string;
  name: string;
  avatar: string;
  createdDate: string;
  gender: UserGender;
  dateBirth: string;
  role: UserRole;
  description: string;
  location: UserLocation;
  image?: string;
  level: UserLevel;
  typeOfTrain: string[];
  certificates: string[];
  merit: string;
  trainingReady: boolean;
};

export type UserUpdate = {
  id: string;
  name?: string;
  avatar?: string;
  gender?: UserGender;
  dateBirth?: Date;
  role?: UserRole;
  description?: string;
  location?: UserLocation;
  createdAt?: Date;
  image?: string;
  level?: UserLevel;
  typeOfTrain?: string[];
  timeOfTraining?: UserTime;
  caloriesToReset?: number;
  caloriesToSpend?: number;
  trainingReady?: boolean;
  certificate?: string;
  merit?: string;
  followers?: string[];
  followCoaches?: string[];
  friends?: string[];
};

export type UserCreate = {
  email: string;
  name: string;
  avatar?: string;
  password: string;
  gender: UserGender;
  dateBirth?: string;
  role: UserRole;
  description?: string;
  location: UserLocation;
  image?: string;
  level: UserLevel;
  typeOfTrain?: string[];
  timeOfTraining?: UserTime;
  caloriesToReset?: number;
  caloriesToSpend?: number;
  trainingReady: boolean;
  certificate?: string;
  merit?: string;
};

export const LEVELS = [
  'новичок',
  'любитель',
  'профессионал'
] as const;

export const LOCATIONS = [
  'Пионерская',
  'Петроградская',
  'Удельная',
  'Звёздная',
  'Спортивная',
] as const;

export const GENDERS = [
  'male',
  'female',
  'indifferent',
] as const;
