import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { Feedback } from '@project/shared/shared-types';
import { FeedbackQuery } from '@project/shared/shared-query';
import { FeedbackEntity } from './entities/feedback.entity';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class FeedbackRepository implements CRUDRepository<FeedbackEntity, number, Feedback> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: FeedbackEntity): Promise<Feedback | null> {
    return await this.prisma.feedback.create({data: {...item.toObject()}}); 
  }

  public async findById(feedbackId: number): Promise<Feedback | null> {
    return await this.prisma.feedback.findFirst({
      where: {
        feedbackId
      }
    });
  }

  public async update(feedbackId: number, item: FeedbackEntity): Promise<Feedback> {
    return await this.prisma.feedback.update({
      where: {
        feedbackId
      },
      data: {...item.toObject()}
    });
  }

  public async findByWorkoutId(workoutId: number, {limit, page}:FeedbackQuery): Promise<Feedback[] | null> {
    const feedbacks = await this.prisma.feedback.findMany({
      where: {
        workoutId
      },
      take: limit,
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
    return feedbacks;
  }

  public async destroy(feedbackId: number): Promise<void> {
    await this.prisma.feedback.delete({ where: {feedbackId} });
  }
}
