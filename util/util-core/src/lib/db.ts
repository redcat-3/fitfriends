import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMongoConnectionString } from './helpers';

export function getMongooseOptions(optionSpace: string): MongooseModuleAsyncOptions {
  return {
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>(`${optionSpace}.user`) || '',
          password: config.get<string>(`${optionSpace}.password`) || '',
          port: config.get<string>(`${optionSpace}.port`) || '',
          host: config.get<string>(`${optionSpace}.host`) || '',
          databaseName: config.get<string>(`${optionSpace}.name`) || '',
          authDatabase: config.get<string>(`${optionSpace}.authBase`) || '',
        })
      }
    },
    inject: [ConfigService]
  }
}
