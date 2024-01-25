import { Feedback } from "../types/reaction";
import { AVATARS, DESCRIPTIONS, NAMES } from "./users";
import { getRandomArrayElement, getRandomNumber, randomDateDate } from "./utils";

export const generateFeedback = ( number: number, workoutId: number): Feedback => {
  const feedback = {
    feedbackId: number,
    workoutId,
    userId: `user${getRandomNumber(1, 5)}@pochta.local`,
    avatar: getRandomArrayElement(AVATARS),
    name: getRandomArrayElement(NAMES),
    rating: getRandomNumber(0, 5),
    text: getRandomArrayElement(DESCRIPTIONS),
    createdDate: randomDateDate(new Date(2023, 1, 1), new Date()),
  }
  return feedback;
}

export function createFeedbacks (count: number, workoutId: number) {
  const arr: number[] = [];
    for (let i = 1; i <= count; i++) {
      arr.push(i);
    }
  return arr.map((id) => generateFeedback(id, workoutId));
}
