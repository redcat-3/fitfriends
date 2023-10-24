import { UserGender, UserGeneratorInterface, UserLevel, UserLocation, UserRole, UserTime } from '@project/shared/shared-types';
import { MOCS_DATA } from './mocs';
import { generateRandomValue, getRandomBoolean, getRandomItem, getRandomItems, randomDate } from '@project/util/util-core';
import { CountCaloriesToReset, CountCaloriesToSpend, CreateUserDto, UserDto } from '@project/shared/shared-dto';

const DEFAULT_USER_PASSWORD = '123456';

export default class UserGenerator implements UserGeneratorInterface {
  constructor(private readonly mockData = MOCS_DATA) {}

  public generate(number: number): CreateUserDto {
    const role = getRandomItem<string>(this.mockData.ROLES) as unknown as UserRole;
    const user: UserDto = {
      email: `user${number}@pochta.local`,
      name: getRandomItem<string>(this.mockData.NAMES),
      avatarId: getRandomItem<string>(this.mockData.AVATARS),
      gender: getRandomItem<string>(this.mockData.GENDERS) as unknown as UserGender,
      dateBirth: randomDate(new Date(2012, 0, 1), new Date()),
      role,
      description: getRandomItem<string>(this.mockData.DESCRIPTIONS),
      location: getRandomItem<string>(this.mockData.LOCATIONS) as unknown as UserLocation,
      image: getRandomItem<string>(this.mockData.AVATARS),
      level: getRandomItem<string>(this.mockData.LEVELS) as unknown as UserLevel,
      typeOfTrain: getRandomItems(this.mockData.TYPES_OF_TRAIN),
      password: DEFAULT_USER_PASSWORD
    }
    if (role === UserRole.User) {
      const userUser = {
        ... user,
        timeOfTrain: getRandomItem<string>(this.mockData.TIMES_OF_TRAIN) as unknown as UserTime,
        caloriesToReset: generateRandomValue(CountCaloriesToReset.Min, CountCaloriesToReset.Max, 0),
        caloriesToSpend: generateRandomValue(CountCaloriesToSpend.Min, CountCaloriesToSpend.Max, 0),
        trainingReady: getRandomBoolean()
      }
      return userUser;
    } else if (role === UserRole.Сoach) {
      const userCoach = {
        ... user,
        certificate: getRandomItem<string>(this.mockData.CERTIFICATE),
        merit: getRandomItem<string>(this.mockData.MERITS),
        personalTraining: getRandomBoolean()
      }
      return userCoach;
    }
  }
}
