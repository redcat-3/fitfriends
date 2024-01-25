import {getRandomArrayElement, getRandomNumber, getRandomArray, getSubArrayFromArray, getRandomBoolean} from './utils.js';

const NAMES = [
  'Аэробика',
  'Бег',
  'Йога',
  'Бокс',
  'Пилатес',
];

const AVATARS = [
    'img/content/avatars/users/photo-1.png',
    'img/content/avatars/users/photo-2.png',
    'img/content/avatars/users/photo-3.png',
    'img/content/avatars/users/photo-4.png',
    'img/content/avatars/users/photo-5.png',
];

const PREVIEWS = [
    'img/content/thumbnails/preview-01',
    'img/content/thumbnails/preview-02',
    'img/content/thumbnails/preview-03',
];

const BACKS = [
    '/img/content/training-1',
    '/img/content/training-2',
    '/img/content/training-3',
    '/img/content/training-4',
];

const PROMOS = [
  'img/content/promo-1',
  'img/content/promo-2',
  'img/content/promo-3',
];

const GENDERS = [
    'male',
    'female',
    'indifferent',
];

const ROLES = [
    'user',
    'coach'
];

const DESCRIPTIONS = [
    'Страшный рассказ о драконе. Колдовство, предательство и необыкновенный мир фэнтези.',
    'История про вампиров из маленького городка. Коварство, нестандартный сюжет и необыкновенные приключения священника.',
    'Идти или остановиться? Вопрос без правильного ответа. Рассказ о долгой и смертельной прогулке.',
    'Как похудеть и не сойти с ума? А как вернуть вес обратно? Необычная история противостояния.',
    'Прими звонок и превратись в зомби. Рассказ о зомбировании через средства связи.'
];

const LOCATIONS = [
    'Пионерская',
    'Петроградская',
    'Удельная',
    'Звёздная',
    'Спортивная'
];

const LEVELS = [
    'новичок',
    'любитель',
    'профессионал'
];

const  TYPES_OF_TRAIN = [
    'йога', 
    'бег', 
    'бокс', 
    'стрейчинг', 
    'кроссфит', 
    'аэробика', 
    'пилатес'
];

const TIMES_OF_TRAIN = [
    '10-30',
    '30-50',
    '50-80',
    '80-100',
];

const createWorkout = (id: number) => {
  const workout = {
    workoutId: id,
    coachId: `user${id}@pochta.local`,
    name: getRandomArrayElement(NAMES),
    background: getRandomArrayElement(BACKS),
    level: getRandomArrayElement(LEVELS),
    type: getRandomArrayElement(TYPES_OF_TRAIN),
    timeOfTraining: getRandomArrayElement(TIMES_OF_TRAIN),
    price: getRandomNumber(0, 1000),
    caloriesToSpend: getRandomNumber(1000, 5000),
    description: getRandomArrayElement(DESCRIPTIONS),
    gender: getRandomArrayElement(GENDERS),
    video: '/img/content/training-video/video-thumbnail',
    special: getRandomBoolean(),
    rating: getRandomNumber(1, 5),
  };
  return workout;
};

export function createWorkouts (count: number) {
  const arr: number[] = [];
    for (let i = 0; i < count; i++) {
      arr.push(i);
    }
  return arr.map((id) => createWorkout(id));
}

export const workouts = createWorkouts(6);

const createSpecial= (id: number) => {
    const workout = {
      workoutId: id,
      name: getRandomArrayElement(NAMES),
      background: getRandomArrayElement(PREVIEWS),
      level: getRandomArrayElement(LEVELS),
      type: getRandomArrayElement(TYPES_OF_TRAIN),
      timeOfTraining: getRandomArrayElement(TIMES_OF_TRAIN),
      price: getRandomNumber(0, 1000),
      caloriesToSpend: getRandomNumber(1000, 5000),
      description: getRandomArrayElement(DESCRIPTIONS),
      gender: getRandomArrayElement(GENDERS),
      video: '/video1.mov',
      special: true,
      rating: 0
    };
    return workout;
  };
  
  export function createSpecials (count: number) {
    const arr = [1];
      for (let i = 1; i <= count; i++) {
        arr.push(i);
      }
    return arr.map((id) => createSpecial(id));
  }
  
  const createPromo= (id: number) => {
    const price = getRandomNumber(0, 1000);
    const workout = {
      workoutId: id,
      name: getRandomArrayElement(NAMES),
      background: getRandomArrayElement(PROMOS),
      price,
      oldPrice: price*1.5,
      description: getRandomArrayElement(DESCRIPTIONS),
      special: true,
    };
    return workout;
  };
  
  export function createPromos (count: number) {
    const arr = [];
      for (let i = 1; i <= count + 1; i++) {
        arr.push(i);
      }
    return arr.map((id) => createPromo(id));
  } 

export {createWorkout};
