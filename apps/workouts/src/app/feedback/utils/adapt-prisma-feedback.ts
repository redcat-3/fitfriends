import { Feedback } from "@prisma/client";
import { FeedbackRdo } from "../rdo/feedback.rdo";

export function adaptPrismaFeedback(prismaFeedback: Feedback | null): FeedbackRdo {
    if (prismaFeedback) {
      const feedback = {
        ...prismaFeedback,
        createdDate: prismaFeedback.createdDate.toISOString(),
      };
      return feedback;
    }
    return null;
  }