import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LEVELS, LOCATIONS, User, UserLevel, UserLocation, UserRole } from '../../types/user-data';
import { levelToRussian, levelToValue, locationToEnum, workoutTypeToName } from '../../utils';
import { USER_CATALOG_CHECKBOX_LIMIT } from '../../constant';
import { WORKOUT_TYPES, WorkoutType } from '../../types/workout-data';

type UserCatalogFormProps = {
  location: UserLocation;
  typeOfTrain: string[];
  level: UserLevel;
  role: UserRole
};

function UserCatalogForm({level, location, typeOfTrain, role}: UserCatalogFormProps): JSX.Element {
  let navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const [locations, setLocations] = useState([location]);
  const [locationsOpen, setLocationsOpen] = useState(false);
  let listOfLocations = LOCATIONS;
  const setLocationList = () => {
    return LOCATIONS.length > USER_CATALOG_CHECKBOX_LIMIT || locationsOpen ? 
      listOfLocations.slice(0, USER_CATALOG_CHECKBOX_LIMIT) :
      listOfLocations;
  };
  const [types, setTypes] = useState(typeOfTrain);
  const [typesOpen, setTypesOpen] = useState(false);
  let listOfTypes = WORKOUT_TYPES;
  const setTypesList = () => {
    return WORKOUT_TYPES.length > USER_CATALOG_CHECKBOX_LIMIT || typesOpen ? 
      listOfTypes.slice(0, USER_CATALOG_CHECKBOX_LIMIT) :
      listOfTypes;
  };
  const [currentLevel, setLevel] = useState(level);
  const [sort, setSort] = useState(role);
  return (
    <div className="user-catalog-form">
      <h2 className="visually-hidden">Каталог пользователя</h2>
      <div className="user-catalog-form__wrapper">
        <button
          className="btn-flat btn-flat--underlined user-catalog-form__btnback"
          type="button"
          onClick={goBack}
        >
          <svg width="14" height="10" aria-hidden="true">
            <use xlinkHref="#arrow-left"></use>
          </svg>
          <span>Назад</span>
        </button>
        <h3 className="user-catalog-form__title">Фильтры</h3>
        <form className="user-catalog-form__form">
          <div className="user-catalog-form__block user-catalog-form__block--location">
            <h4 className="user-catalog-form__block-title">Локация, станция метро</h4>
            <ul className="user-catalog-form__check-list">
              {locationsOpen ? 
                LOCATIONS.map((item, index) => (
                  <li className="user-catalog-form__check-list-item" key={index}>                          
                    <div className="custom-toggle custom-toggle--checkbox">
                      <label>
                        <input
                          type="checkbox"
                          value={item}
                          name="duration"
                          onClick={() => {
                            const locationsNew = locations.slice();
                            const index = locationsNew.indexOf(locationToEnum(item));
                            if(index !== -1) {
                              locationsNew.splice(index,1);
                            } else {
                              locationsNew.push(locationToEnum(item));
                            }
                            setLocations(locationsNew);
                          }}
                          checked={locations.includes(locationToEnum(item))}
                        />
                        <span className="custom-toggle__icon">
                          <svg width="9" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-check"></use>
                          </svg>
                        </span>
                        <span className="custom-toggle__label">{LOCATIONS[index]}</span>
                      </label>
                    </div>
                  </li>
                )) :
                setLocationList().map((item, index) => (
                  <li className="user-catalog-form__check-list-item" key={index}>                          
                    <div className="custom-toggle custom-toggle--checkbox">
                      <label>
                        <input
                          type="checkbox"
                          value={item}
                          name="duration"
                          onClick={() => {
                            const locationsNew = locations.slice();
                            const index = locationsNew.indexOf(locationToEnum(item));
                            if(index !== -1) {
                              locationsNew.splice(index,1);
                            } else {
                              locationsNew.push(locationToEnum(item));
                            }
                            setLocations(locationsNew);
                          }}
                          checked={locations.includes(locationToEnum(item))}
                        />
                        <span className="custom-toggle__icon">
                          <svg width="9" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-check"></use>
                          </svg>
                        </span>
                        <span className="custom-toggle__label">{LOCATIONS[index]}</span>
                      </label>
                    </div>
                  </li>
                )) 
              }
            </ul>
            {(!locationsOpen && LOCATIONS.length > USER_CATALOG_CHECKBOX_LIMIT) && 
              <button
                className="btn-show-more user-catalog-form__btn-show"
                type="button"
                onClick={() => setLocationsOpen(true)}
              ><span>Посмотреть все</span>
                <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
                  <use xlinkHref="#arrow-down"></use>
                </svg>
              </button>
            }
          </div>
          <div className="user-catalog-form__block user-catalog-form__block--spezialization">
            <h4 className="user-catalog-form__block-title">Специализация</h4>
            <ul className="user-catalog-form__check-list">
              {typesOpen ?
                WORKOUT_TYPES.map((item, index) => (
                  <li className="user-catalog-form__check-list-item" key={index}>                          
                    <div className="custom-toggle custom-toggle--checkbox">
                      <label>
                        <input
                          type="checkbox"
                          value={item}
                          name="spezialization"
                          onClick={() => {
                            const typesNew = types.slice();
                            const index = typesNew.indexOf(item);
                            if(index !== -1) {
                              typesNew.splice(index,1);
                            } else {
                              typesNew.push(item);
                            }
                            setTypes(typesNew);
                          }}
                          checked={types.includes(item)}
                        />
                        <span className="custom-toggle__icon">
                          <svg width="9" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-check"></use>
                          </svg>
                        </span>
                        <span className="custom-toggle__label">{workoutTypeToName(WORKOUT_TYPES[index])}</span>
                      </label>
                    </div>
                  </li>
                )) :
                setTypesList().map((item, index) => (
                  <li className="user-catalog-form__check-list-item" key={index}>                          
                    <div className="custom-toggle custom-toggle--checkbox">
                      <label>
                        <input
                          type="checkbox"
                          value={item}
                          name="spezialization"
                          onClick={() => {
                            const typesNew = types.slice();
                            const index = typesNew.indexOf(item);
                            if(index !== -1) {
                              typesNew.splice(index,1);
                            } else {
                              typesNew.push(item);
                            }
                            setTypes(typesNew);
                          }}
                          checked={types.includes(item)}
                        />
                        <span className="custom-toggle__icon">
                          <svg width="9" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-check"></use>
                          </svg>
                        </span>
                        <span className="custom-toggle__label">{workoutTypeToName(WORKOUT_TYPES[index])}</span>
                      </label>
                    </div>
                  </li>
                )) 
              }
            </ul>
            {(!typesOpen && WORKOUT_TYPES.length > USER_CATALOG_CHECKBOX_LIMIT) && 
              <button
                className="btn-show-more user-catalog-form__btn-show"
                type="button"
                onClick={() => setTypesOpen(true)}
                ><span>Посмотреть все</span>
                <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
                  <use xlinkHref="#arrow-down"></use>
                </svg>
              </button>
            }
          </div>
          <div className="user-catalog-form__block user-catalog-form__block--level">
            <h4 className="user-catalog-form__block-title">Ваш уровень</h4>
            <div className="custom-toggle-radio">
              {LEVELS.map((item, index) => (
                <div className="custom-toggle-radio__block" key={index}>
                  <label>
                    <input
                      type="radio"
                      name="user-agreement"
                      value={levelToValue(item)}
                      onClick={() => setLevel(levelToValue(item))}
                      checked={currentLevel === (levelToValue(item))}
                    />
                    <span className="custom-toggle-radio__icon"></span>
                    <span className="custom-toggle-radio__label">{levelToRussian(levelToValue(item))}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="user-catalog-form__block">
            <h3 className="user-catalog-form__title user-catalog-form__title--sort">Сортировка</h3>
            <div className="btn-radio-sort">
              <label>
                <input
                  type="radio"
                  name="sort"
                  checked={sort === UserRole.Coach}
                  onClick={() => setSort(UserRole.Coach)}
                />
                <span className="btn-radio-sort__label">Тренеры</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="sort"
                  checked={sort === UserRole.User}
                  onClick={() => setSort(UserRole.User)}
                />
                <span className="btn-radio-sort__label">Пользователи</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default React.memo(UserCatalogForm);
