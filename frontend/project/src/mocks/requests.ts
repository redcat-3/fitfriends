import { UserLocation, UserRole } from "../types/user-data";
import { AVATARS, LOCATIONS, NAMES, TYPES_OF_TRAIN } from "./users";
import { getRandomArray, getRandomArrayElement, getRandomBoolean, getRandomNumber } from "./utils";

export type RequestToTrain = {
  userId: string,
  name: string,
  location: string,
  avatar: string,
  trainingReady: boolean,
  typeOfTrain: string[],
  request: boolean,
  role: UserRole,
  requestId?: number
}

export const generateRequestToTrain = ( number: number): RequestToTrain => {
  const request = {
    requestId: number,
    role: UserRole.User,
    name: getRandomArrayElement(NAMES),
    userId: `user${number}@pochta.local`,
    location: getRandomArrayElement(LOCATIONS) as unknown as UserLocation,
    avatar: getRandomArrayElement(AVATARS),
    trainingReady: true,
    typeOfTrain: getRandomArray(TYPES_OF_TRAIN).slice(0, 1),
    request: true
  }
  return request;
}

export function createRequests (count: number) {
  const arr = [];
    for (let i = 1; i <= count; i++) {
      arr.push(i);
    }
  return arr.map((id) => generateRequestToTrain(id));
}
