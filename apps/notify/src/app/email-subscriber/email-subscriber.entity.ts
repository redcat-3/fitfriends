import { Entity } from '@project/util/util-types';
import { Subscriber } from '@project/shared/shared-types';

export class EmailSubscriberEntity implements Entity<EmailSubscriberEntity>, Subscriber {
  public id: string | undefined;
  public email: string;
  public name: string;
  public dateNotify?: string;


  constructor(emailSubscriber: Subscriber) {
    this.id = emailSubscriber.id;
    this.email = emailSubscriber.email;
    this.name = emailSubscriber.name;
    this.dateNotify = emailSubscriber.dateNotify;
  }

  public toObject(): EmailSubscriberEntity {
    return { ...this };
  }

  public fillEntity(entity: Subscriber) {
    this.email = entity.email;
    this.name = entity.name;
    this.id = entity.id;
    this.dateNotify = entity.dateNotify;
  }
}
