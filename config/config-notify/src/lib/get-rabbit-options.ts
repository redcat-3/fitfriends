import { ConfigService } from '@nestjs/config';
import { getRabbitMQConnectionString } from '../../../../util/util-core/src';
export function getRabbitMQOptions(optionSpace: string) {
  return {
    useFactory: async (config: ConfigService) => ({
      exchanges: [
        {
          name: config.get<string>(`${optionSpace}.exchangeNews`),
          type: 'direct'
        },
        {
          name: config.get<string>(`${optionSpace}.exchangeSubscriber`),
          type: 'direct'
        }
      ],
      uri:getRabbitMQConnectionString({
        host: config.get<string>(`${optionSpace}.host`),
        password: config.get<string>(`${optionSpace}.password`),
        user: config.get<string>(`${optionSpace}.user`),
        port: config.get<string>(`${optionSpace}.port`),
      }),
      connectionInitOptions: { wait: true },
      enableControllerDiscovery: true,
    }),
    inject: [ConfigService]
  }
}
