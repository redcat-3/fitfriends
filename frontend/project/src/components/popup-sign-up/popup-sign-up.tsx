import { ChangeEventHandler, FormEvent, useState } from "react";
import { LOCATIONS, UserGender, UserLevel, UserLocation, UserRole, UserTime } from "../../types/user-data";
import { AppRoute, EMAIL_REGEXP, ErrorMessage, MAX_AVATAR_SIZE, UserNameLength, UserPasswordLength } from "../../constant";
import { useAppDispatch } from "../../hooks";
import { redirectToRoute } from "../../store/action";
import { setRegisterData } from "../../store/user-process/user-process";
import { store } from "../../store";

function PopupSignUp(): JSX.Element {
  const dispatch = useAppDispatch();
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [formError, setFormError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLocationOpened, setIsLocationOpened] = useState(false);
  const [isAvatarLoad, setIsAvatarLoad] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const [currentGender, setCurrentGender] = useState(UserGender.Male);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: '',
    gender: UserGender.Male,
    dateBirth: '',
    location: '',
    role: '' as unknown as UserRole,
    password: ''
  });

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event): void => {
    if(event.target.files) {
      if(event.target.files[0].size > MAX_AVATAR_SIZE) {
        setIsDisabled(true);
        setFileError(true);
        setIsAvatarLoad(false);
      }
      setFormData({...formData, avatar: URL.createObjectURL(event.target.files[0])});
      setFileError(false);
      setIsAvatarLoad(true);
      setIsDisabled(false);
      return;
    }
    return;
  };

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormData({...formData, name: event.target.value});
    if(event.target.value.length <= UserNameLength.Min || UserNameLength.Max <= event.target.value.length) {
      setIsDisabled(true);
      setNameError(true);
    } else {
      setNameError(false);
      setIsDisabled(false);
    }
  };

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormData({...formData, email: event.target.value});
    if(EMAIL_REGEXP.test(event.target.value)) {
      setEmailError(false);
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
      setEmailError(true);
    }
  };

  const handleDateBirthChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormData({...formData, dateBirth: event.target.value});
  };

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormData({...formData, password: event.target.value});
    if(event.target.value.length <= UserPasswordLength.Min || UserPasswordLength.Max <= event.target.value.length) {
      setIsDisabled(true);
      setPasswordError(true);
    } else {
      setPasswordError(false);
      setIsDisabled(false);
    }
  };

  const onSendForm = () => {
    if (
      formData.avatar !== '' &&
      formData.dateBirth !== '' &&
      formData.email !== '' &&
      formData.gender !== '' as UserGender &&
      formData.location !== '' &&
      formData.name !== '' &&
      formData.password !== '' &&
      agreement
    ) {
      setFormError(false);
      const newUser = {
        email: formData.email,
        name: formData.name,
        password: formData.password,
        avatarId: formData.avatar,
        gender: formData.gender,
        dateBirth: formData.dateBirth,
        role: formData.role,
        description: '',
        location: formData.location as UserLocation,
        image: '',
        level: '' as UserLevel,
        typeOfTrain: [''],
        certificates: [''],
        trainingReady: false,
        merit: '',
        timeOfTraining: '' as UserTime,
        caloriesToReset: 0,
        caloriesToSpend: 0
      }
      store.dispatch(setRegisterData(newUser));
      if(formData.role === UserRole.Coach) {
        dispatch(redirectToRoute(AppRoute.QuestionnaireCoach))
      } else if(formData.role === UserRole.User) {
        dispatch(redirectToRoute(AppRoute.QuestionnaireUser))
      }
    } else {
      setFormError(true);
    }
  };
  return (
    <div className="popup-form popup-form--sign-up">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__title-wrapper">
            <h1 className="popup-form__title">Регистрация</h1>
          </div>
          <div className="popup-form__form">
            <form
              method="get"
              onSubmit={(evt: FormEvent<HTMLFormElement>) => {
                evt.preventDefault();
                onSendForm();
              }}
            >
              <div className="sign-up">
                <div className="sign-up__load-photo">
                  <div className="input-load-avatar">
                    <label>
                      <input
                        onChange={handleFileChange}
                        className="visually-hidden"
                        type="file"
                        accept="image/png, image/jpeg"
                      />
                      {isAvatarLoad && <span className="input-load-avatar__avatar">
                        <img
                          src={formData.avatar}
                          width="98"
                          height="98"
                          alt="user photo"
                        ></img>
                      </span>}
                      {!isAvatarLoad && <span className="input-load-avatar__btn">
                        <svg width="20" height="20" aria-hidden="true">
                          <use xlinkHref="#icon-import"></use>
                        </svg>
                      </span>}
                      {fileError && <span className="custom-input__error">{ErrorMessage.File}</span>}
                    </label>
                  </div>
                  <div className="sign-up__description">
                    <h2 className="sign-up__legend">Загрузите фото профиля</h2>
                    <span className="sign-up__text">JPG, PNG, оптимальный размер 100&times;100&nbsp;px</span>
                  </div>
                </div>
                <div className="sign-up__data">
                  <div className="custom-input">
                    <label>
                      <span className="custom-input__label">Имя</span>
                      <span className="custom-input__wrapper">
                        <input
                          onChange={handleNameChange}
                          value={formData.name}
                          type="text"
                          name="name"
                        />
                      </span>
                      {nameError && <span className="custom-input__error">{ErrorMessage.Name}</span>}
                    </label>
                  </div>
                  <div className="custom-input">
                    <label>
                      <span className="custom-input__label">E-mail</span>
                      <span className="custom-input__wrapper">
                        <input
                          onChange={handleEmailChange}
                          value={formData.email}
                          type="email"
                          name="email"
                        />
                      </span>
                      {emailError && <span className="custom-input__error">{ErrorMessage.Email}</span>}
                    </label>
                  </div>
                  <div className="custom-input">
                    <label>
                      <span className="custom-input__label">Дата рождения</span>
                      <span className="custom-input__wrapper">
                        <input
                          onChange={handleDateBirthChange}
                          value={formData.dateBirth}
                          type="date"
                          name="birthday"
                          max="2099-12-31"
                        />
                      </span>
                    </label>
                  </div>
                  <div className={`custom-select ${isLocationOpened ? 'is-open' : 'custom-select--not-selected'} not-empty`}>
                    <span className="custom-select__label">Ваша локация</span>
                    <button
                      className="custom-select__button"
                      type="button"
                      aria-label="Выберите одну из опций"
                      onClick={() => setIsLocationOpened(true)}
                    >
                      <span className="custom-select__text">{formData.location}</span>
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
                        ))}
                    </ul>
                  </div>
                  <div className="custom-input">
                    <label>
                      <span className="custom-input__label">Пароль</span>
                      <span className="custom-input__wrapper">
                        <input
                          onChange={handlePasswordChange}
                          value={formData.password}
                          type="password"
                          name="password"
                          autoComplete="off"
                        />
                      </span>
                      {passwordError && <span className="custom-input__error">{ErrorMessage.Password}</span>}
                    </label>
                  </div>
                  <div className="sign-up__radio"><span className="sign-up__label">Пол</span>
                    <div className="custom-toggle-radio custom-toggle-radio--big">
                      <div className="custom-toggle-radio__block">
                        <label>
                          <input
                            type="radio"
                            name="sex"
                            checked={currentGender === UserGender.Male}
                            onChange={() => {
                              setFormData({...formData, gender: UserGender.Male});
                              setCurrentGender(UserGender.Male);
                            }}
                            value={formData.gender}
                          />
                          <span className="custom-toggle-radio__icon"></span>
                          <span className="custom-toggle-radio__label">Мужской</span>
                        </label>
                      </div>
                      <div className="custom-toggle-radio__block">
                        <label>
                          <input
                            type="radio"
                            name="sex"
                            checked={currentGender === UserGender.Female}
                            onChange={() => {
                              setFormData({...formData, gender: UserGender.Female});
                              setCurrentGender(UserGender.Female)
                            }}
                            value={formData.gender}
                          />
                          <span className="custom-toggle-radio__icon"></span>
                          <span className="custom-toggle-radio__label">Женский</span>
                        </label>
                      </div>
                      <div className="custom-toggle-radio__block">
                        <label>
                          <input
                            type="radio"
                            name="sex"
                            checked={currentGender === UserGender.Indifferent}
                            onChange={() => {
                              setFormData({...formData, gender: UserGender.Male});
                              setCurrentGender(UserGender.Indifferent)
                            }}
                            value={formData.gender}
                          />
                          <span className="custom-toggle-radio__icon"></span>
                          <span className="custom-toggle-radio__label">Неважно</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sign-up__role">
                  <h2 className="sign-up__legend">Выберите роль</h2>
                  <div className="role-selector sign-up__role-selector">
                    <div className="role-btn">
                      <label>
                        <input
                          onChange={() => setFormData({...formData, role: UserRole.Coach})}
                          value={formData.role}
                          className="visually-hidden"
                          type="radio"
                          name="role"
                          checked={formData.role === UserRole.Coach ? true : false}
                        />
                        <span className="role-btn__icon">
                          <svg width="12" height="13" aria-hidden="true">
                            <use xlinkHref="#icon-cup"></use>
                          </svg>
                        </span>
                        <span className="role-btn__btn">Я хочу тренировать</span>
                      </label>
                    </div>
                    <div className="role-btn">
                      <label>
                        <input
                          onChange={() => setFormData({...formData, role: UserRole.User})}
                          value={formData.role}
                          className="visually-hidden"
                          type="radio"
                          name="role"
                          checked={formData.role === UserRole.User ? true : false}/>
                        <span className="role-btn__icon">
                          <svg width="12" height="13" aria-hidden="true">
                            <use xlinkHref="#icon-weight"></use>
                          </svg>
                        </span>
                        <span className="role-btn__btn">Я хочу тренироваться</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="sign-up__checkbox">
                  <label>
                    <input
                      type="checkbox"
                      value="user-agreement"
                      name="user-agreement"
                      checked={agreement}
                      onClick={() => {
                        setAgreement(!agreement);
                        setIsDisabled(agreement);
                        setFormError(agreement);
                      }}
                    />
                    <span className="sign-up__checkbox-icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-check"></use>
                      </svg>
                    </span>
                    <span className="sign-up__checkbox-label">Я соглашаюсь с <span>политикой конфиденциальности</span> компании</span>
                  </label>
                </div>
                <button
                  className="btn sign-up__button"
                  type="submit"
                  disabled={isDisabled}
                >Продолжить</button>
                {formError && <span className="custom-input__error">{ErrorMessage.Form}</span>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PopupSignUp;
