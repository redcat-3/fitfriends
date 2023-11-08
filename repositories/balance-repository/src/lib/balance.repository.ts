import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { Balance } from '@prisma/client';
import { BalanceEntity } from './balance.entity';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class BalanceRepository implements CRUDRepository<BalanceEntity, number, Balance> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BalanceEntity): Promise<Balance> {
    return await this.prisma.balance.create({data: {...item.toObject()}}); 
  }

  public async findById(balanceId: number): Promise<Balance | null> {
    return await this.prisma.balance.findFirst({
      where: {
        balanceId
      }
    });
  }

  public async update(balanceId: number, item: BalanceEntity): Promise<Balance> {
    return await this.prisma.balance.update({
      where: {
        balanceId
      },
      data: {...item.toObject()}
    });
  }

  public async findByUserId(userId: string): Promise<Balance[] | null> {
    const balances = await this.prisma.balance.findMany({
      where: {
        userId
      }
    });
    return balances;
  }

  public async destroy(balanceId: number): Promise<void> {
    await this.prisma.balance.delete({ where: {balanceId} });
  }
}
