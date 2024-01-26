export const BACKEND_URL = 'http://localhost:4000/api';
export const REQUEST_TIMEOUT = 5000;
export const AUTH_TOKEN_KEY_NAME = 'fitfriends-token';
export const REFRESH_TOKEN_KEY_NAME = 'fitfriends-refresh-token';
export const DEFAULT_LIMIT = 6;
export const DEFAULT_LIMIT_FOR_YOU = 9;
export const DEFAULT_LIMIT_SPECIAL = 3;
export const DEFAULT_LIMIT_ORDERS = 4;
export const DEFAULT_LIMIT_POPULAR = 9;
export const DEFAULT_LIMIT_LOOK_FOR = 8;
export const EMAIL_REGEXP = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,6})$/;
export const MAX_AVATAR_SIZE = 2200000;
export const MAX_TYPES_COUNT = 3;
export const NOTIFICATION_DATE_FORMAT = 'DD MMMM, HH:mm';
export const TIME_OUT_DELAY = 500;
export const USER_CATALOG_CHECKBOX_LIMIT = 5;
export const DEFAULT_NOT_FOUND_MESSAGE = 'К сожалению ничего не нашлось';

export enum AppRoute {
  SignIn = '/login',
  Logout = '/logout',
  Main = '/main',
  Intro = '/',
  CreateTraining ='/create-training',
  FriendsList = '/friends-list/:id',
  MyOrders = '/my-orders/:id',
  MyPurchases = '/my-purchases/:id',
  MyTrainings = '/my-trainings/:id',
  PersonalAccount = '/personal-account/:id',
  QuestionnaireCoach = '/questionnaire-coach',
  QuestionnaireUser = '/questionnaire-user',
  SignUp = '/registr',
  TrainingCard = '/training-card/:id',
  TrainingCatalog = '/training-catalog',
  UserCard = '/user-card/:id',
  UsersCatalog = '/users-catalog',
  Error404 = '/error404',
}

export enum APIRoute {
  Users = '/users',
  Workouts = '/workouts',
  Feedbacks = '/feedbacks',
  Orders = '/orders',
  Requests = '/requests',
  Notifications = '/notifications',
  Balances = 'balances',
  Login = '/users/login',
  Register = '/users/register',
  ChangePassword = '/users/change-password',
  UpdateAvatar = '/users/upload-avatar',
  Friends = 'users/list/friends',
}

export enum NameSpace {
  Workout = 'workout',
  Workouts = 'workouts',
  Reaction ='reaction',
  User = 'user',
  Orders = 'orders',
  Notifications = 'notifications',
  Requests = 'requests',
  Feedback = 'feedback',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const TabIndex = {
  index0: 0,
  indexMinus1: -1
};

export const UserNameLength = {
  Min: 1,
  Max: 15,
};

export const UserPasswordLength = {
  Min: 6,
  Max: 12,
};

export const UserDescriptionLength = {
  Min: 10,
  Max: 140,
};

export const CoachMeritLength = {
  Min: 10,
  Max: 140,
};

export const CountCaloriesToReset = {
  Min: 1000,
  Max: 5000,
};

export const CountCaloriesToSpend = {
  Min: 1000,
  Max: 5000,
};

export const WorkoutDescriptionLength = {
  Min: 10,
  Max: 140,
};

export const NameLength = {
  Min: 1,
  Max: 15,
};

export const RangePriceValue = {
  Min: 0,
  Max: 5000,
};

export const RangeRatingValue = {
  Min: 0,
  Max: 5,
};

export const PriceSortValue = {
  Desc: 'desc',
  Asc: 'asc',
  Free: '0'
};

export const FeedbackTextLength = {
  Min: 100,
  Max: 1024,
};

export const Message = {
  Empty: 'Скоро тут будет интересно',
} as const

export const DEFAULT_IMG = '/img/content/thumbnails/nearest-gym-01'

export const ErrorMessage = {
  LoginUnknown:'Unknown error during login.',
  Login: 'Error during login.',
  Register: 'Error during register.',
  RegisterUnknown:'Unknown error during register.',
  BadRequest:'Bad Request: Some data is missing or invalid.',
  Name: `Mинимальная длина ${UserNameLength.Min} символ, максимальная длина ${UserNameLength.Max} символов`,
  Title: `Mинимальная длина ${NameLength.Min} символ, максимальная длина ${NameLength.Max} символов`,
  File: 'Максимальный размер изображения 1 мегабайт',
  Email: 'Неверный формат электронной почты',
  Password: `Mинимальная длина ${UserPasswordLength.Min} символов, максимальная длина ${UserPasswordLength.Max} символов`,
  Description: `Mинимальная длина ${WorkoutDescriptionLength.Min} символов, максимальная длина ${WorkoutDescriptionLength.Max} символов`,
  Feedback: `Mинимальная длина ${FeedbackTextLength.Min} символов, максимальная длина ${FeedbackTextLength.Max} символов`,
  Merit: `Mинимальная длина ${CoachMeritLength.Min} символов, максимальная длина ${CoachMeritLength.Max} символов`,
  Price: 'Введите не отрицательное число',
  Form: 'Необходимо заполнить все поля',
  TypesCount: `Одновременно может быть выбрано не больше ${MAX_TYPES_COUNT} типов тренировок`,
  CaloriesToReset: `Минимальное значение ${CountCaloriesToReset.Min}, максимально значение ${CountCaloriesToReset.Max}, только целые числа.`,
  CaloriesToSpend: `Минимальное значение ${CountCaloriesToSpend.Min}, максимально значение ${CountCaloriesToSpend.Max}, только целые числа.`
} as const

export const CITY = {
  title: 'Saint-Petersburg',
  lat: 59.937500,
  lng: 30.308611,
  zoom: 10,
};

export const URL_MARKER_DEFAULT = '/img/sprite/icon-pin.svg';
export const URL_MARKER_CURRENT = '/img/sprite/icon-pin-user.svg';

export const POINTS = [
  {
    title: 'Пионерская',
    lat: 60.0025,
    lng: 30.29666,
  }, {
    title: 'Петроградская',
    lat: 59.96611,
    lng: 30.31138,
  }, {
    title: 'Удельная',
    lat: 60.01638,
    lng: 30.31555,
  }, {
    title: 'Звёздная',
    lat: 59.83305,
    lng: 30.34944,
  }, {
    title: 'Спортивная',
    lat: 59.95194,
    lng: 30.29055,
  },
];

export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
};