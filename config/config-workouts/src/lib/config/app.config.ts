import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { ConfigName, DEFAULT_ERROR_MESSAGE } from '../config-workouts.constant';

export interface ApplicationConfig {
  environment: string;
  port: number;
  globalPrefix: string;
}

export default registerAs(ConfigName.App, (): ApplicationConfig => {
  const config: ApplicationConfig = {
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10),
    globalPrefix: process.env.GLOBAL_PREFIX,
  };

  const validationSchema = Joi.object<ApplicationConfig>({
    environment: Joi.string().valid('development', 'production', 'stage'),
    port: Joi.number().port(),
    globalPrefix: Joi.string(),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Application Config]:  ${DEFAULT_ERROR_MESSAGE} ${error.message}`,
    );
  }

  return config;
});
