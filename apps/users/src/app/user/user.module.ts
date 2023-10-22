import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepositoryModule } from '@project/repositories/user-repository';

@Module({
  imports: [UserRepositoryModule],
  controllers: [UserController],
  providers: [UserService ]
})
export class UserModule {}
