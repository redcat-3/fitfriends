import { UserLevel } from "./user-data";

export type TrainigQuery = {
  priceMin: number;
  priceMax: number;
  caloriesMin: number;
  caloriesMax: number;
  ratingMin: number;
  ratingMax: number;
  times: string[];
}

export type UserQuery = {
  limit?: number;
  page?: number;
  location?: string;
  typeOfTrain?: string;
  level?: UserLevel;
  sortDirection: string;
  trainingReady: boolean;
}

export type WorkoutQueryDto = {
  limit: number;
  page: Number;
  sortBy: string;
  caloriesToSpend?: string;
  price?: string;
  type?: string;
  rating?: string;
  timeOfTraining?: string;
  sortDirection: string;
  special?: boolean;
}

export type OrderQueryDto = {
  limit: number;
  page: number;
  sortDirection: string; //'asc' | 'desc';
  sortBy: string; //'orderPrice' | 'count';
}

export type FeedbackQueryDto = {
  limit?: number;
  page?: number;
}