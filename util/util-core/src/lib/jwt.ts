import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { TokenPayload, User } from '@project/shared/shared-types'

export async function getJwtOptions(configService: ConfigService): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>('jwt.accessTokenSecret'),
    signOptions: {
      expiresIn: configService.get<string>('jwt.accessTokenExpiresIn'),
      algorithm: 'HS256',
    }
  }
}

export function createJWTPayload(user: User): TokenPayload {
  if(!user._id) {
    throw new Error(
      `User not found`,
    );
  }
  return {
    sub: user._id,
    email: user.email,
    name: user.name,
  };
}
