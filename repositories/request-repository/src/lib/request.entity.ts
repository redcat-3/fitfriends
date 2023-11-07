import { Request } from '@project/shared/shared-types';
import { RequestStatus } from '@prisma/client';

export class RequestEntity implements Request {
  public requestId: number | undefined;
  public requester: string;
  public userId: string;
  public createdDate: Date;
  public updatedDate: Date;
  public status: RequestStatus;

  constructor(request: Request) {
    this.requestId = request.requestId;
    this.requester = request.requester;
    this.userId = request.userId;
    this.createdDate = request.createdDate;
    this.updatedDate = request.updatedDate;
    this.status = request.status;
  }
  
  public toObject() {
    return {...this };
  }

}