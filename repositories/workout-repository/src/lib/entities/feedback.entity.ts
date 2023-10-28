import { Feedback } from '@project/shared/shared-types';

export class FeedbackEntity implements Feedback {
  public feedbackId: number;
  public workoutId: number;
  public userId: string;
  public rating: number;
  public text: string;
  public createdDate: Date;

  constructor(feedback: Feedback) {
    this.fillEntity(feedback);
  }
  
  public toObject() {
    return {...this };
  }

  public fillEntity(feedback: Feedback) {
    this.feedbackId = feedback.feedbackId;
    this.workoutId = feedback.workoutId;
    this.userId = feedback.userId;
    this.rating = feedback.rating;
    this.text = feedback.text;
    this.createdDate = feedback.createdDate;
  }
}
