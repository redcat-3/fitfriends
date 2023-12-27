import { ApiProperty } from '@nestjs/swagger';
import { OrderType, PaymentMethod } from '@prisma/client';
import { Expose } from 'class-transformer';

export class OrderRdo {
  @ApiProperty({
    description: 'Unique Order ID',
    example: 23
  })
  @Expose()
  public orderId: number;

  @ApiProperty({
    description: 'User ID',
    example: 'fhsfjfk'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Coach ID',
    example: 'fhsfjfk'
  })
  @Expose()
  public coachId: string;

  @ApiProperty({
    description: 'Вид покупки',
    example: OrderType.subscription
  })
  @Expose()
  public orderType: OrderType;

  @ApiProperty({
    description: 'Workout ID',
    example: 23
  })
  @Expose()
  public workoutId: number;

  @ApiProperty({
    description: `Стоимость тренировки в рублях. Ограничения: целые числа; число больше или равно 0. Значение 0 подразумевает бесплатную тренировку.`,
    example: 500
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: `Количество приобретаемых тренировок.`,
    example: 4
  })
  @Expose()
  public count: number;

  @ApiProperty({
    description: `Стоимость заказа. Рассчитывается по формуле: количество * цена тренировки.`,
    example: 1000
  })
  @Expose()
  orderPrice: number;

  @ApiProperty({
    description: 'Вариант оплаты заказа.',
    example: PaymentMethod.mir
  })
  @Expose()
  public paymentMethod: PaymentMethod;

  @ApiProperty({
    description: 'Order post date',
  })
  @Expose()
  public createdDate: string;
}
