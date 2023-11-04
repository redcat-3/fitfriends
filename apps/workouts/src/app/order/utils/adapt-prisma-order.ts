import { Order } from "@prisma/client";
import { OrderRdo } from "../rdo/order.rdo";

export function adaptPrismaOrder(prismaOrder: Order | null): OrderRdo {
    if (prismaOrder) {
      const Order = {
        ...prismaOrder,
        createdDate: prismaOrder.createdDate.toISOString(),
      };
      return Order;
    }
    return null;
  }