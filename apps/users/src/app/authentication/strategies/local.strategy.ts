import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../authentication.service';
import { Injectable } from '@nestjs/common';
import { UserCoach, UserUser } from '@project/shared/shared-types';
import { USERNAME_FIELD_NAME } from '../authentication.constant';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthenticationService) {
    super({ usernameField: USERNAME_FIELD_NAME });
  }

  public async validate(email: string, password: string): Promise<UserUser | UserCoach> {
    return this.authService.verifyUser({email, password})
  }
}
