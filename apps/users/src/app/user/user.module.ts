import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepositoryModule } from '@project/repositories/user-repository';
import { NotifyModule } from '../notify/notify.module';

@Module({
  imports: [
    UserRepositoryModule,
    NotifyModule,
  ],
  controllers: [UserController],
  providers: [UserService ]
})
export class UserModule {}
