import { Request } from "@prisma/client";
import { RequestRdo } from "../rdo/request.rdo";

export function adaptPrismaRequest(prismaRequest: Request | null): RequestRdo {
    if (prismaRequest) {
      const Request = {
        ...prismaRequest,
        createdDate: prismaRequest.createdDate.toISOString(),
        updatedDate: prismaRequest.updatedDate.toISOString(),
      };
      return Request;
    }
    return null;
  }