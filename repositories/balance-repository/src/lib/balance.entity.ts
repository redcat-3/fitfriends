import { Balance } from '@project/shared/shared-types';

export class BalanceEntity implements Balance {
  public balanceId: number | undefined;
  public userId: string;
  public workoutId: number;
  public price: number;
  public count: number;

  constructor(balance: Balance) {
    this.balanceId = balance.balanceId;
    this.userId = balance.userId;
    this.workoutId = balance.workoutId;
    this.price = balance.price;
    this.count = balance.count;
  }
  
  public toObject() {
    return {...this };
  }

}