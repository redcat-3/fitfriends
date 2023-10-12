export const ENV_USERS_FILE_PATH = 'apps/users/.users.env';

export const ConfigName = {
  Db: 'database',
  App : 'application',
  Jwt : 'jwt',
  Rabbit : 'rabbit',
} as const;

export const DEFAULT_ERROR_MESSAGE =  'Environments validation failed. Please check .env file. Error message: '
