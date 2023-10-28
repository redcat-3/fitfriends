export interface Feedback {
  feedbackId?: number;
  workoutId: number;
  userId: string;
  rating: number;
  text: string;
  createdDate: Date;
}