import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BalanceRepository } from '@project/repositories/balance-repository';
import { BalanceEntity } from '@project/repositories/balance-repository';
import { BalancesError } from './balance.constant';
import { CreateBalanceDto, UpdateBalanceDto } from '@project/shared/shared-dto';
import { UserRepository } from '@project/repositories/user-repository';
import { UserRole } from '@project/shared/shared-types';

@Injectable()
export class BalanceService {
  constructor(
    private readonly balanceRepository: BalanceRepository,
    private readonly userRepository: UserRepository,
  ) { }

  public async create(dto: CreateBalanceDto) {
    const user = await this.userRepository.findById(dto.userId);
    if (!user) {
      throw new NotFoundException(BalancesError.UserNotFound);
    }
    if (user.role !== UserRole.User) {
      throw new NotFoundException(BalancesError.WrongRole);
    }
    const balanceEntity = new BalanceEntity(dto);
    const newBalance = await this.balanceRepository.create(balanceEntity);
    return newBalance;
  }

  public async update(dto: UpdateBalanceDto, userId: string) {
    const balance = await this.balanceRepository.findById(dto.balanceId);
    if (userId !== balance.userId) {
      throw new BadRequestException(BalancesError.AuthUserError);
    }
    const updatedBalance = { 
      ...balance, 
      count: dto.count
    };
    const balanceEntity = await new BalanceEntity(updatedBalance);
    return this.balanceRepository.update(dto.balanceId, balanceEntity);
  }


  public async findByUser(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(BalancesError.UserNotFound);
    }
    if (user.role !== UserRole.User) {
      throw new NotFoundException(BalancesError.WrongRole);
    }
    return await this.balanceRepository.findByUserId(userId);
  }
  
  public async findByBalanceId(balanceId: number, userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(BalancesError.UserNotFound);
    }
    if (user.role !== UserRole.User) {
      throw new NotFoundException(BalancesError.WrongRole);
    }
    return await this.balanceRepository.findById(balanceId);
  }

  public async delete(BalanceId: number, userId: string) {
    const Balance = await this.balanceRepository.findById(BalanceId);
    if (Balance.userId === userId) {
      return await this.balanceRepository.destroy(BalanceId);
    } else {
      throw new BadRequestException(BalancesError.NotCreatorError);
    }
  }
}
