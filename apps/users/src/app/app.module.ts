import { Module } from '@nestjs/common';
import { ConfigUsersModule } from '@project/config/config-users';
import { AuthenticationModule } from './authentication/authentication.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';

@Module({
  imports: [
    ConfigUsersModule, 
    AuthenticationModule, 
    RefreshTokenModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
