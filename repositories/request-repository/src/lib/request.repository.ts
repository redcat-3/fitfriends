import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { Request } from '@prisma/client';
import { RequestEntity } from './request.entity';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class RequestRepository implements CRUDRepository<RequestEntity, number, Request> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: RequestEntity): Promise<Request> {
    return await this.prisma.request.create({data: {...item.toObject()}}); 
  }

  public async findById(requestId: number): Promise<Request | null> {
    return await this.prisma.request.findFirst({
      where: {
        requestId
      }
    });
  }

  public async update(requestId: number, item: RequestEntity): Promise<Request> {
    return await this.prisma.request.update({
      where: {
        requestId
      },
      data: {...item.toObject()}
    });
  }

  public async findByRequester(requester: string): Promise<Request[] | null> {
    const requests = await this.prisma.request.findMany({
      where: {
        requester
      },
    });
    return requests;
  }

  public async findByUserId(userId: string): Promise<Request[] | null> {
    const requests = await this.prisma.request.findMany({
      where: {
        userId
      },
    });
    return requests;
  }

  public async destroy(requestId: number): Promise<void> {
    await this.prisma.request.delete({ where: {requestId} });
  }
}
