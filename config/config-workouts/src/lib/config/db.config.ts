import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { ConfigName, DEFAULT_ERROR_MESSAGE } from '../config-workouts.constant';

export interface DbConfig {
  host: string;
  name: string;
  port: number;
  user: string;
  password: string;
  authBase: string;
}

export default registerAs(ConfigName.Db, (): DbConfig => {
  if (!process.env.MONGO_HOST || !process.env.MONGO_PORT || !process.env.MONGO_DB || !process.env.MONGO_USER
    || !process.env.MONGO_PASSWORD || !process.env.MONGO_AUTH_BASE) {
    throw new Error(
      `[Application Config]: ${DEFAULT_ERROR_MESSAGE} PORT undefined`,
    );
  }
  const config: DbConfig = {
    host: process.env.MONGO_HOST,
    port: parseInt(process.env.MONGO_PORT, 10),
    name: process.env.MONGO_DB,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    authBase: process.env.MONGO_AUTH_BASE,
  };

  const validationSchema = Joi.object<DbConfig>({
    host: Joi.string().hostname().required(),
    port: Joi.number().port(),
    name: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    authBase: Joi.string().required(),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[DB Config]: ${DEFAULT_ERROR_MESSAGE} ${error.message}`,
    );
  }

  return config;
});