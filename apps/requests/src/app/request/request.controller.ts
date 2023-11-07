import { Req, Controller, HttpStatus, Param, Post, Get, UseGuards, Body, Patch, Delete } from '@nestjs/common';
import { RequestsService } from './request.service';
import { API_TAG_NAME, RequestsMessages, RequestsPath } from './request.constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@project/util/util-core';
import { RequestRdo } from './rdo/request.rdo';
import { RequestWithUserPayload } from '@project/shared/shared-types';
import { adaptPrismaRequest } from './utils/adapt-prisma-request';
import { RequestStatus } from '@prisma/client';
import { CreateRequestDto } from '@project/shared/shared-dto';

@ApiTags(API_TAG_NAME)
@Controller(RequestsPath.Main)
export class RequestsController {
  constructor(
    private readonly requestsService: RequestsService,
  ) {}

  @ApiResponse({
    type: RequestRdo,
    status:HttpStatus.CREATED,
    description: RequestsMessages.Add
  })
  @UseGuards(JwtAuthGuard)
  @Post(RequestsPath.Add)
  public async addRequest(@Req() { user }: RequestWithUserPayload, @Body() dto: CreateRequestDto) {
    const newRequest = await this.requestsService.create(user.sub, dto.userId);
    return adaptPrismaRequest(newRequest);
  }

  @ApiResponse({
    type: RequestRdo,
    status: HttpStatus.OK,
    description: RequestsMessages.Update,
  })
  @UseGuards(JwtAuthGuard)
  @Patch(RequestsPath.Id)
  public async updateRequest(@Param('requestId') id:number, @Body() status: RequestStatus, @Req() {user}: RequestWithUserPayload) {
    const userId = user.sub;
    const request = await this.requestsService.update(id, status, userId,);
    return adaptPrismaRequest(request);
  }
  
  @ApiResponse({
    status: HttpStatus.OK,
    description: RequestsMessages.Delete,
  })
  @UseGuards(JwtAuthGuard)
  @Delete(RequestsPath.Id)
  public async deleteRequest(@Param('requestId') id: number, @Req() {user}: RequestWithUserPayload) {
    const userId = user.sub;
    return await this.requestsService.delete(id, userId,);
  }

  @ApiResponse({
    type: RequestRdo,
    status: HttpStatus.OK,
    description: RequestsMessages.Show,
  })
  @UseGuards(JwtAuthGuard)
  @Get(RequestsPath.Id)
  public async showRequest(@Param('requestId') requestId: number, @Req() {user}: RequestWithUserPayload) {
    const userId = user.sub;
    const request = await this.requestsService.findByRequestId(userId, requestId);
    return adaptPrismaRequest(request);
  }

  @ApiResponse({
    type: RequestRdo,
    status: HttpStatus.OK,
    description: RequestsMessages.Show,
  })
  @UseGuards(JwtAuthGuard)
  @Get(RequestsPath.Index)
  public async indexRequests(@Req() {user}: RequestWithUserPayload) {
    const userId = user.sub;
    const requests = await this.requestsService.findByUserId(userId);
    return requests.map((request) => adaptPrismaRequest(request));
  }
  
  @ApiResponse({
    type: RequestRdo,
    status: HttpStatus.OK,
    description: RequestsMessages.Index,
  })
  @UseGuards(JwtAuthGuard)
  @Get(RequestsPath.IndexMyRequests)
  public async indexMyRequests(@Req() {user}: RequestWithUserPayload) {
    const requests = await this.requestsService.findByRequester(user.sub);
    return requests.map((request) => adaptPrismaRequest(request));
  }
}
