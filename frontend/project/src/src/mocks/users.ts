import { getRandomArrayElement, getRandomNumber, getRandomArray, getRandomBoolean, randomDate } from './utils';
import { User, UserCoach, UserGender, UserLevel, UserLocation, UserRole, UserTime, UserUser } from '../types/user-data';
import { CountCaloriesToReset, CountCaloriesToSpend } from '../constant';

export const NAMES = [
    'Angelina',
    'Angel',
    'Dina',
    'Tom',
    'Dima',
]
export const AVATARS = [
    '/img/content/avatars/users/photo-1',
    '/img/content/avatars/users/photo-2',
    '/img/content/avatars/users/photo-3',
    '/img/content/avatars/users/photo-4',
    '/img/content/avatars/users/photo-5',
]
export const GENDERS = [
    'male',
    'female',
    'indifferent',
]
export const ROLES = [
    'user',
    'coach'
]
export const DESCRIPTIONS = [
    'Страшный рассказ о драконе. Колдовство, предательство и необыкновенный мир фэнтези.',
    'История про вампиров из маленького городка. Коварство, нестандартный сюжет и необыкновенные приключения священника.',
    'Идти или остановиться? Вопрос без правильного ответа. Рассказ о долгой и смертельной прогулке.',
    'Как похудеть и не сойти с ума? А как вернуть вес обратно? Необычная история противостояния.',
    'Прими звонок и превратись в зомби. Рассказ о зомбировании через средства связи.'
]
export const LOCATIONS = [
    'Пионерская',
    'Петроградская',
    'Удельная',
    'Звёздная',
    'Спортивная'
]
export const LEVELS = [
    'beginner',
    'ethusiast',
    'pro'
];

export const TYPES_OF_TRAIN = [
  'yoga',
  'running',
  'boxing',
  'stretching',
  'crossfit',
  'aerobics',
  'pilates',
]
const TIMES_OF_TRAIN = [
    '10-30',
    '30-50',
    '50-80',
    '80-100',
]
const CERTIFICATE = [
  '/img/content/certificates-and-diplomas/certificate-1',
  '/img/content/certificates-and-diplomas/certificate-2',
  '/img/content/certificates-and-diplomas/certificate-3',
  '/img/content/certificates-and-diplomas/certificate-4',
  '/img/content/certificates-and-diplomas/certificate-5',
]
const MERITS = [
    'Страшный рассказ о драконе. Колдовство, предательство и необыкновенный мир фэнтези.',
    'История про вампиров из маленького городка. Коварство, нестандартный сюжет и необыкновенные приключения священника.',
    'Идти или остановиться? Вопрос без правильного ответа. Рассказ о долгой и смертельной прогулке.',
    'Как похудеть и не сойти с ума? А как вернуть вес обратно? Необычная история противостояния.',
    'Прими звонок и превратись в зомби. Рассказ о зомбировании через средства связи.'
]

const generateUserCoach = ( number: number): UserCoach => {
  const user = {
    id: `user${number}@pochta.local`,
    email: `user${number}@pochta.local`,
    name: getRandomArrayElement(NAMES),
    avatar: getRandomArrayElement(AVATARS),
    gender: getRandomArrayElement(GENDERS) as unknown as UserGender,
    dateBirth: randomDate(new Date(2012, 0, 1), new Date()),
    createdDate: randomDate(new Date(2012, 0, 1), new Date()),
    role: UserRole.Coach,
    description: getRandomArrayElement(DESCRIPTIONS),
    location: getRandomArrayElement(LOCATIONS) as unknown as UserLocation,
    image: getRandomArrayElement(AVATARS),
    level: getRandomArrayElement(LEVELS) as unknown as UserLevel,
    typeOfTrain: getRandomArray(TYPES_OF_TRAIN).slice(0, 3),
    certificates: CERTIFICATE,
    merit: getRandomArrayElement(MERITS),
    trainingReady: getRandomBoolean()
    }
  return user;
};

const generateUserUser = ( number: number): UserUser => {
  const user = {
    id: `user${number}@pochta.local`,
    email: `user${number}@pochta.local`,
    name: getRandomArrayElement(NAMES),
    avatar: getRandomArrayElement(AVATARS),
    gender: getRandomArrayElement(GENDERS) as unknown as UserGender,
    dateBirth: randomDate(new Date(2012, 0, 1), new Date()),
    createdDate: randomDate(new Date(2012, 0, 1), new Date()),
    role: UserRole.User,
    description: getRandomArrayElement(DESCRIPTIONS),
    location: getRandomArrayElement(LOCATIONS) as unknown as UserLocation,
    image: getRandomArrayElement(AVATARS),
    level: getRandomArrayElement(LEVELS) as unknown as UserLevel,
    typeOfTrain: getRandomArray(TYPES_OF_TRAIN).slice(0, 3),
    timeOfTrain: getRandomArrayElement(TIMES_OF_TRAIN) as unknown as UserTime,
    caloriesToReset: getRandomNumber(CountCaloriesToReset.Min, CountCaloriesToReset.Max),
    caloriesToSpend: getRandomNumber(CountCaloriesToSpend.Min, CountCaloriesToSpend.Max),
    trainingReady: getRandomBoolean()
    }
  return user;
};

const generateUser = ( number: number): User => {
  const role = getRandomArrayElement(ROLES) as unknown as UserRole;
  const user = {
    id: `user${number}@pochta.local`,
    email: `user${number}@pochta.local`,
    name: getRandomArrayElement(NAMES),
    avatar: getRandomArrayElement(AVATARS),
    gender: getRandomArrayElement(GENDERS) as unknown as UserGender,
    dateBirth: randomDate(new Date(2012, 0, 1), new Date()),
    createdDate: randomDate(new Date(2012, 0, 1), new Date()),
    role,
    description: getRandomArrayElement(DESCRIPTIONS),
    location: getRandomArrayElement(LOCATIONS) as unknown as UserLocation,
    image: getRandomArrayElement(AVATARS),
    level: getRandomArrayElement(LEVELS) as unknown as UserLevel,
    typeOfTrain: getRandomArray(TYPES_OF_TRAIN).slice(0, 3),
  }
  if (role === UserRole.User) {
    const userUser = {
      ... user,
      timeOfTrain: getRandomArrayElement(TIMES_OF_TRAIN) as unknown as UserTime,
      caloriesToReset: getRandomNumber(CountCaloriesToReset.Min, CountCaloriesToReset.Max),
      caloriesToSpend: getRandomNumber(CountCaloriesToSpend.Min, CountCaloriesToSpend.Max),
      trainingReady: getRandomBoolean(),
      certificate: [],
      merit: ''
    }
    return userUser;
  } else if (role === UserRole.Coach) {
    const userCoach = {
      ... user,
      certificate: getRandomArray(CERTIFICATE),
      merit: getRandomArrayElement(MERITS),
      trainingReady: getRandomBoolean(),
      timeOfTrain: '' as unknown as UserTime,
      caloriesToReset: 0,
      caloriesToSpend: 0,
    }
    return userCoach;
  }
  const userUser = {
      ... user,
      timeOfTrain: getRandomArrayElement(TIMES_OF_TRAIN) as unknown as UserTime,
      caloriesToReset: getRandomNumber(CountCaloriesToReset.Min, CountCaloriesToReset.Max),
      caloriesToSpend: getRandomNumber(CountCaloriesToSpend.Min, CountCaloriesToSpend.Max),
      trainingReady: getRandomBoolean(),
      certificate: getRandomArrayElement(CERTIFICATE),
      merit: getRandomArrayElement(MERITS),
    }
  return userUser;
};
export const user = generateUserUser(22);
export const coach = generateUserCoach(33);
const createUsers = (ids: number[]) => ids.map((id) => generateUser(id));
const createUserUsers = (ids: number[]) => ids.map((id) => generateUserUser(id));
const arr: number[] = [];
for (let i = 0; i < 6; i++) {
	arr.push(i);
}
export const users = createUsers(arr);

export function createNextUsers (count: number) {
  const arr = [0];
    for (let i = 1; i < count; i++) {
      arr.push(i);
    }
  return arr.map((id) => generateUser(id));
}

export { generateUser, createUsers, generateUserUser, createUserUsers, generateUserCoach };