export const ENV_USERS_FILE_PATH = '.users.env';

export const ConfigName = {
  Db: 'database',
  App : 'application',
  Jwt : 'jwt',
  Rabbit : 'rabbit',
} as const;

export const DEFAULT_ERROR_MESSAGE =  'Environments validation failed. Please check .env file. Error message: ';

export const DEFAULT_RABBIT_PORT = 5672;
