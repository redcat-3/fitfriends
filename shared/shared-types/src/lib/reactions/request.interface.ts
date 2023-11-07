import { RequestStatus } from '@prisma/client';

export interface Request {
  requestId?: number;
  requester: string;
  userId: string;
  createdDate: Date;
  updatedDate: Date;
  status: RequestStatus;
}
  