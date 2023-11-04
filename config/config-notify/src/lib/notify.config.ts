import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { DEFAULT_ERROR_MESSAGE } from './config-users.constant';

export interface NotifyConfig {
  environment: string;
  port: number;
  globalPrefix: string;
  db: {
    host: string;
    port: number;
    user: string;
    name: string;
    password: string;
    authBase: string;
  },
  rabbit: {
    host: string;
    password: string;
    user: string;
    queueNews: string;
    queueSubscriber: string;
    exchangeNews: string;
    exchangeSubscriber: string;
    port: number;
  },
  mail: {
    host: string;
    port: number;
    user: string;
    password: string;
    from: string;
  },
}

export default registerAs('application', (): NotifyConfig => {
  if (!process.env.MONGO_HOST || !process.env.MONGO_PORT || !process.env.MONGO_DB || !process.env.MONGO_USER || !process.env.MONGO_PASSWORD || !process.env.MONGO_AUTH_BASE 
    || !process.env.NODE_ENV || !process.env.PORT || !process.env.GLOBAL_PREFIX
    || !process.env.RABBIT_HOST || !process.env.RABBIT_PASSWORD || !process.env.RABBIT_PORT || !process.env.RABBIT_USER || !process.env.RABBIT_NEWS_QUEUE || !process.env.RABBIT_SUBSCRIBER_QUEUE || !process.env.RABBIT_NEWS_EXCHANGE || !process.env.RABBIT_SUBSCRIBER_EXCHANGE
    || !process.env.MAIL_SMTP_HOST || !process.env.MAIL_SMTP_PORT || !process.env.MAIL_USER_NAME || !process.env.MAIL_USER_PASSWORD || !process.env.MAIL_FROM) {
    throw new Error(
      `[Application Config]: ${DEFAULT_ERROR_MESSAGE} variable undefined`,
    );
  }
  const config: NotifyConfig = {
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10),
    globalPrefix: process.env.GLOBAL_PREFIX,
    db: {
      host: process.env.MONGO_HOST,
      port: parseInt(process.env.MONGO_PORT, 10),
      name: process.env.MONGO_DB,
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      authBase: process.env.MONGO_AUTH_BASE
    },
    rabbit: {
      host: process.env.RABBIT_HOST,
      password: process.env.RABBIT_PASSWORD,
      port: parseInt(process.env.RABBIT_PORT, 10),
      user: process.env.RABBIT_USER,
      queueNews: process.env.RABBIT_NEWS_QUEUE,
      queueSubscriber: process.env.RABBIT_SUBSCRIBER_QUEUE,
      exchangeNews: process.env.RABBIT_NEWS_EXCHANGE,
      exchangeSubscriber: process.env.RABBIT_SUBSCRIBER_EXCHANGE,
    },
    mail: {
      host: process.env.MAIL_SMTP_HOST,
      port: parseInt(process.env.MAIL_SMTP_PORT, 10),
      user: process.env.MAIL_USER_NAME,
      password: process.env.MAIL_USER_PASSWORD,
      from: process.env.MAIL_FROM,
    }
  };

  const validationSchema = Joi.object<NotifyConfig>({
    environment: Joi.string()
      .valid('development', 'production', 'stage'),
    port: Joi.number()
      .port(),
    db: Joi.object({
      host: Joi.string().valid().hostname(),
      port: Joi.number().port(),
      name: Joi.string().required(),
      user: Joi.string().required(),
      password: Joi.string().required(),
      authBase: Joi.string().required(),
    }),
    rabbit: Joi.object({
      host: Joi.string().valid().hostname().required(),
      password: Joi.string().required(),
      port: Joi.number().port(),
      user: Joi.string().required(),
      queueNews: Joi.string().required(),
      queueSubscriber: Joi.string().required(),
      exchangeNews: Joi.string().required(),
      exchangeSubscriber: Joi.string().required(),
    }),
    mail: Joi.object({
      host: Joi.string().valid().hostname().required(),
      port: Joi.number().port(),
      user: Joi.string().required(),
      password: Joi.string().required(),
      from: Joi.string().required(),
    })
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Notify Config]: Environments validation failed. Please check .env file.
       Error message: ${error.message}`,
    );
  }

  return config;
});
