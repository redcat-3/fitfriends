import {plainToInstance, ClassConstructor} from 'class-transformer';
import { ParseTimeError } from './util.constant';
import dayjs = require('dayjs');
import { MongoConnectionString, RabbitConnectionString } from '@project/shared/shared-types';

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
}

export function getMongoConnectionString({username, password, databaseName, host, port, authDatabase}: MongoConnectionString): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function getRabbitMQConnectionString({user, password, host, port}: RabbitConnectionString): string {
  return `amqp://${user}:${password}@${host}:${port}`;
}

export const getDate = () => {
  return dayjs().toISOString();
}

export type DateTimeUnit = 's' | 'h' | 'd' | 'm' | 'y';
export type TimeAndUnit = { value: number; unit: DateTimeUnit };

export function parseTime(time: string): TimeAndUnit {
  const regex = /^(\d+)([shdmy])/;
  const match = regex.exec(time);

  if (!match) {
    throw new Error(`${ParseTimeError.Mismatch} ${time}`);
  }

  const [, valueRaw, unitRaw] = match;
  const value = parseInt(valueRaw, 10);
  const unit = unitRaw as DateTimeUnit;

  if (isNaN(value)) {
    throw new Error(ParseTimeError.IsNaN);
  }

  return { value, unit }
}
