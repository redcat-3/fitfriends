import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, Max, Min } from 'class-validator';
import { OrderCount } from '../reaction.constant';
import { OrderType, PaymentMethod } from '@prisma/client';
import { ExampleValue } from '../reaction.constant';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Вид покупки',
    example: OrderType.subscription
  })
  @IsEnum(OrderType)
  public orderType: OrderType;

  @ApiProperty({
    description: 'Workout ID',
    example: ExampleValue.PrismaId
  })
  @IsInt()
  public workoutId: number;

  @ApiProperty({
    description: `Количество приобретаемых тренировок.`,
    example: ExampleValue.CountOfWorkouts
  })
  @IsInt()
  @Max(OrderCount.Max)
  @Min(OrderCount.Min)  
  public count: number;

  @ApiProperty({
    description: 'Вариант оплаты заказа.',
    example: PaymentMethod.mir
  })
  @IsEnum(PaymentMethod)
  public paymentMethod: PaymentMethod;
}
