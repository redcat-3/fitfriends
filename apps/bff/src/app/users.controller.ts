import { Body, Controller, Post, Req, UseFilters } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.constant';
import { Request } from 'express';
import { LoginUserDto } from '@project/shared/shared-dto';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
    constructor(
      private readonly httpService: HttpService
    ) {}
  
    @Post('login')
    public async login(@Body() loginUserDto: LoginUserDto) {
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, loginUserDto);
      return data;
    }
  
    @Post('refresh')
    public async refreshToken(@Req() req: Request) {
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/refresh`, null, {
        headers: {
          'Authorization': req.headers['authorization']
        }
      });
  
      return data;
    }
  }