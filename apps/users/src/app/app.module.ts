import { Module } from '@nestjs/common';
import { ConfigUsersModule } from '@project/config/config-users';

@Module({
  imports: [ConfigUsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
