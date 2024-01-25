import React, { ChangeEventHandler, FormEvent, useState } from 'react';
import { GENDERS, LEVELS, LOCATIONS, UserGender, UserLevel, UserRole, UserTime } from '../../types/user-data';
import { WORKOUT_TYPES } from '../../types/workout-data';
import { AppRoute, ErrorMessage, MAX_TYPES_COUNT, UserDescriptionLength, UserNameLength } from '../../constant';
import { useAppDispatch } from '../../hooks';
import { redirectToRoute } from '../../store/action';
import { genderToRussian, levelToRussian, levelToValue, workoutTypeToName, workoutTypeToValue } from '../../utils';

type UserInfoEditProps = {
  id: string;
  avatar: string;
  name:string;
  description: string;
  location: string;
  typeOfTrain: string[];
  trainingReady: boolean;
  level: UserLevel;
  gender: UserGender;
  role: UserRole;
};

function UserInfoEdit({id, avatar, name, description, trainingReady, location, typeOfTrain, level, gender, role}: UserInfoEditProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [isLocationOpened, setIsLocationOpened] = useState(false);
  const [isGenderOpened, setIsGenderOpened] = useState(false);
  const [isLevelOpened, setIsLevelOpened] = useState(false);
  const [formError, setFormError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [typesCountError, setTypesCountError] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  const [formData, setFormData] = useState({
    name,
    avatar,
    level,
    typeOfTrain,
    location,
    description,
    gender,
    trainingReady,
  });

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormData({...formData, name: event.target.value});
    if(event.target.value.length <= UserNameLength.Min || UserNameLength.Max <= event.target.value.length) {
      setNameError(true);
      setFormError(true);
    } else {
      setNameError(false);
      setFormError(false);
    }
  };

  const onSend = () => {
    if (!formError) {
      setFormError(false);
      dispatch(redirectToRoute(`/personal-account/${id}` as AppRoute))
    } else {
      setFormError(true);
    }
  };

  const handleTextChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setFormData({...formData, description: event.target.value});
    if(event.target.value.length < UserDescriptionLength.Min || event.target.value.length > UserDescriptionLength.Max) {
      setDescriptionError(true);
      setFormError(true);
    } else {
      setDescriptionError(false);
      setFormError(false);
    }
  };

  const handleAvatarChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if(event.target.files) {
      const filePhoto = event.target.files[0];
      setFormData({...formData, avatar: URL.createObjectURL(filePhoto)});
      setFormError(false);
    } else {
      setFormError(true);
    }
  };

  return (
    <section className="user-info-edit">
      <div className="user-info-edit__header">
        <div className="input-load-avatar">
          <label>
            <input
              className="visually-hidden"
              type="file"
              name="user-photo-1"
              accept="image/png, image/jpeg"
              disabled={isEdit}
              onChange={handleAvatarChange}
            />
            <span className="input-load-avatar__avatar">
              { formData.avatar === '' && 
                <span className="input-load-avatar__btn" style={{width: 98, height: 98}}>
                  <svg width="20" height="20" aria-hidden="true">
                    <use xlinkHref="#icon-import"></use>
                  </svg>
                </span>}
              { formData.avatar !== '' && 
                <img
                  src={`${formData.avatar}.png`}
                  srcSet={`${formData.avatar}@2x.png 2x`}
                  width="98"
                  height="98"
                  alt="user photo"
                />}
            </span>
          </label>
        </div>
        <div className="user-info-edit__controls">
          {isEdit === false && <React.Fragment>
            <button
              className="user-info-edit__control-btn"
              aria-label="обновить"
              onClick={() => console.log(formData.avatar)}
            >
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-change"></use>
              </svg>
            </button>
            <button
              className="user-info-edit__control-btn"
              aria-label="удалить"
              onClick={() => setFormData({...formData, avatar: ''})}
            >
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-trash"></use>
              </svg>
            </button>
          </React.Fragment>}
        </div>
      </div>
      <form
        className="user-info-edit__form"
        action="#"
        method="post"
        onSubmit={(evt: FormEvent<HTMLFormElement>) => {
          evt.preventDefault();
          onSend();
        }}
      >
        <button
          className={isEdit ? "btn-flat btn-flat--underlined user-info__edit-button" : "btn-flat btn-flat--underlined user-info-edit__save-button"}
          type={isEdit ? "button" : "submit"}
          aria-label={isEdit ? "Редактировать" : "Сохранить"}
          disabled={formError}
          onClick={() => {
            if(isEdit === false) {
              onSend();
            }
            setIsEdit(false);
          }}
        >
          <svg width="12" height="12" aria-hidden="true">
            <use xlinkHref="#icon-edit"></use>
          </svg>
          <span>{isEdit ? "Редактировать" : "Сохранить"}</span>
        </button>
        <div className="user-info-edit__section">
          <h2 className="user-info-edit__title">Обо мне</h2>
          <div className="custom-input user-info-edit__input">
            <label>
              <span className="custom-input__label">Имя</span>
              <span className="custom-input__wrapper">
                <input
                  type="text"
                  name="name"
                  onChange={handleNameChange}
                  value={formData.name}
                  disabled={isEdit}
                  style={{opacity: 1, backgroundColor: 'transparent'}}
                />
              </span>
              {nameError && <span className="custom-input__error">{ErrorMessage.Title}</span>}
            </label>
          </div>
          <div className="custom-textarea user-info-edit__textarea">
            <label>
              <span className="custom-textarea__label">Описание</span>
              <textarea
                name="description"
                placeholder=""
                onChange={handleTextChange}
                value={formData.description}
                disabled={isEdit}
                style={{opacity: 1, backgroundColor: 'transparent'}}
              >{formData.description}</textarea>
            </label>
            {descriptionError && <span className="custom-input__error">{ErrorMessage.Description}</span>}
          </div>
        </div>
        <div className="user-info-edit__section user-info-edit__section--status">
          <h2 className="user-info-edit__title user-info-edit__title--status">Статус</h2>
          <div className="custom-toggle custom-toggle--switch user-info-edit__toggle">
            <label>
              <input
                type="checkbox"
                name="ready-for-training"
                checked={formData.trainingReady}
                onChange={() => setFormData({...formData, trainingReady: !formData.trainingReady})}
                disabled={isEdit}
              />
              <span className="custom-toggle__icon">
                <svg width="9" height="6" aria-hidden="true">
                  <use xlinkHref="#arrow-check"></use>
                </svg>
              </span>
              <span className="custom-toggle__label">{role === UserRole.Coach ? 'Готов тренировать' : 'Готов к тренировке'}</span>
            </label>
          </div>
        </div>
        <div className="user-info-edit__section">
          <h2 className="user-info-edit__title user-info-edit__title--specialization">Специализация</h2>
          <div className="specialization-checkbox user-info-edit__specialization">
            {WORKOUT_TYPES.map((el) => 
              (
                <div
                  key={el}
                  className="btn-checkbox"
                >
                  <label>
                    <input
                      className="visually-hidden"
                      type="checkbox"
                      name="specialization"
                      value={el}
                      disabled={isEdit}
                      onChange={() => {
                        const currentType: string = el;
                        const types = formData.typeOfTrain.slice();
                        const index = types.indexOf(currentType);
                        if(index !== -1) {
                          types.splice(index, 1);
                          if(types.length <= MAX_TYPES_COUNT) {
                            setTypesCountError(false);
                          }
                        } else if(types.length < MAX_TYPES_COUNT) {
                          types.push(currentType);
                          setTypesCountError(false);
                        } else {
                          setTypesCountError(true);
                        }
                        setFormData({...formData, typeOfTrain: types});
                      }}
                      checked={formData.typeOfTrain.includes(el)}
                    />
                      <span className="btn-checkbox__btn">{workoutTypeToValue(el)}</span>
                  </label>
                </div>
              )
            )}
            {typesCountError && <span className="custom-input__error">{ErrorMessage.TypesCount}</span>}
          </div>
        </div>
        <div className={`custom-select user-info-edit__select ${isLocationOpened ? 'is-open' : 'custom-select--not-selected'} not-empty`}>
          <span className="custom-select__label" style={{opacity: 1}}>Локация</span>
          <div className="custom-select__placeholder">ст. м. Адмиралтейская</div>
          <button
            className="custom-select__button"
            type="button"
            aria-label="Выберите одну из опций"
            disabled={isEdit}
            onClick={() => setIsLocationOpened(true)}
          >
            <span className="custom-select__text">ст. м. {formData.location}</span>
            <span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-down"></use>
              </svg>
            </span>
          </button>
          <ul className="custom-select__list" role="listbox">
            {LOCATIONS.map((el) =>
              (
                <li
                  key={el}
                  role="option"
                  tabIndex={0}
                  className="custom-select__item"
                  aria-selected={formData.location === el}
                  onClick={() => {
                    setFormData({...formData, location: el});
                    setIsLocationOpened(false);
                  }}
                >
                  {el}
                </li>
              )
            )}
          </ul>
        </div>
        <div className={`custom-select user-info-edit__select ${isGenderOpened ? 'is-open' : 'custom-select--not-selected'} not-empty`}>
          <span className="custom-select__label" style={{opacity: 1}}>Пол</span>
          <div className="custom-select__placeholder">{formData.gender}</div>
          <button
            className="custom-select__button"
            type="button"
            aria-label="Выберите одну из опций"
            disabled={isEdit}
            onClick={() => setIsGenderOpened(true)}
          >
            <span className="custom-select__text">{genderToRussian(formData.gender)}</span>
            <span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-down"></use>
              </svg>
            </span>
          </button>
          <ul className="custom-select__list" role="listbox">
            {GENDERS.map((el) =>
              (
                <li
                  key={el}
                  role="option"
                  tabIndex={0}
                  className="custom-select__item"
                  aria-selected={formData.gender === el}
                  onClick={() => {
                    setFormData({...formData, gender: el as UserGender});
                    setIsGenderOpened(false);
                  }}
                >
                  {genderToRussian(el)}
                </li>
              )
            )}
          </ul>
        </div>
        <div className={`custom-select user-info-edit__select ${isLevelOpened ? 'is-open' : 'custom-select--not-selected'} not-empty`}>
          <span className="custom-select__label" style={{opacity: 1}}>Уровень</span>
          <div className="custom-select__placeholder">{levelToRussian(formData.level)}</div>
          <button
            className="custom-select__button"
            type="button"
            aria-label="Выберите одну из опций"
            disabled={isEdit}
            onClick={() => setIsLevelOpened(true)}
          >
            <span className="custom-select__text">{levelToRussian(formData.level)}</span>
            <span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-down"></use>
              </svg>
            </span>
          </button>
          <ul className="custom-select__list" role="listbox">
          {LEVELS.map((el) =>
            (
              <li
                key={el}
                role="option"
                tabIndex={0}
                className="custom-select__item"
                aria-selected={formData.level === levelToValue(el)}
                onClick={() => {
                  setFormData({...formData, level: levelToValue(el)});
                  setIsLevelOpened(false);
                }}
              >
                {el}
              </li>
            ))}
          </ul>
        </div>
      </form>
    </section>
  );
}
export default React.memo(UserInfoEdit);
