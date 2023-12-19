import { Body, Controller, Post, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.constant';
import { Request } from 'express';
import { LoginUserDto } from '@project/shared/shared-dto';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UserIdInterceptor } from './interceptors/userid.interceptor';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
    constructor(
      private readonly httpService: HttpService
    ) {}
  
    @Post('login')
    public async login(@Body() loginUserDto: LoginUserDto) {
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/login`, loginUserDto);
      return data;
    }

    @Post('refresh')
    public async refreshToken(@Req() req: Request) {
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/refresh`, null, {
        headers: {
          'Authorization': req.headers['authorization']
        }
      });
  
      return data;
    }
  }