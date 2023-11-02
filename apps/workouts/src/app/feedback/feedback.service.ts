import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FeedbackRepository } from '@project/repositories/workout-repository';
import { CreateFeedbackDto } from '@project/shared/shared-dto';
import { WorkoutRepository, FeedbackEntity } from '@project/repositories/workout-repository';
import { FeedbacksError } from './feedback.constant';
import { UserRepository } from '@project/repositories/user-repository';
import { UserRole } from '@project/shared/shared-types';
import dayjs from 'dayjs';
import { FeedbackQuery } from '@project/shared/shared-query';

@Injectable()
export class FeedbacksService {
  constructor(
    private readonly feedbackRepository: FeedbackRepository,
    private readonly workoutRepository: WorkoutRepository,
    private readonly userRepository: UserRepository,
  ) { }

  public async create(dto: CreateFeedbackDto, userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(FeedbacksError.UserNotFound);
    } 
    if (user.role !== UserRole.User) {
      throw new BadRequestException(FeedbacksError.WrongRole);
    }
    const workout = await this.workoutRepository.findById(dto.workoutId);
    if (!workout) {
      throw new NotFoundException(FeedbacksError.WorkoutNotFound);
    } 
    const feedback = {
      ...dto,
      userId,
      createdDate: dayjs().toDate(),
    }
    const feedbackEntity = new FeedbackEntity(feedback);
    const newFeedback = await this.feedbackRepository.create(feedbackEntity);
    await this.workoutRepository.addFeedback(dto.workoutId, dto.rating);
    return newFeedback;
  }

  public async findByFeedbackId(id: number) {
    return await this.feedbackRepository.findById(id);
  }

  public async findByWorkoutId(id: number, query: FeedbackQuery) {
    return await this.feedbackRepository.findByWorkoutId(id, query);
  }
}
