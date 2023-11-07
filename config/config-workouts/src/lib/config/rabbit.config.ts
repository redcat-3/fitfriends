import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { RabbitConfig } from '@project/shared/shared-types';
import { ConfigName, DEFAULT_ERROR_MESSAGE, DEFAULT_RABBIT_PORT } from '../config-workouts.constant';

export default registerAs(ConfigName.Rabbit, (): RabbitConfig => {
  const  config: RabbitConfig = {
    host: process.env.RABBIT_HOST,
    password: process.env.RABBIT_PASSWORD,
    port: parseInt(process.env.RABBIT_PORT ?? DEFAULT_RABBIT_PORT.toString(), 10),
    user: process.env.RABBIT_USER,
    queue: process.env.RABBIT_QUEUE,
    exchange: process.env.RABBIT_EXCHANGE,
  };

  const validationSchema = Joi.object<RabbitConfig>({
    host: Joi.string().valid().hostname().required(),
    password: Joi.string().required(),
    port: Joi.number().port().default(DEFAULT_RABBIT_PORT),
    user: Joi.string().required(),
    queue: Joi.string().required(),
    exchange: Joi.string().required(),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Notify Config]: ${DEFAULT_ERROR_MESSAGE} ${error.message}`,
    );
  }

  return config;
});
