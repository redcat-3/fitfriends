export const ENV_NOTIFY_FILE_PATH = '.notify.env';

export const ConfigName = {
  Db: 'database',
  App : 'application',
  Jwt : 'jwt',
  Rabbit : 'rabbit',
} as const;

export const DEFAULT_ERROR_MESSAGE =  'Environments validation failed. Please check .env file. Error message: '
