import { ChangeEventHandler, FormEvent, useEffect, useState } from "react";
import { WORKOUT_TIMES, WORKOUT_TYPES } from "../../types/workout-data";
import { levelToValue, workoutTypeToName, workoutTypeToValue } from "../../utils";
import { AppRoute, AuthorizationStatus, CountCaloriesToReset, CountCaloriesToSpend, ErrorMessage, MAX_TYPES_COUNT } from "../../constant";
import { LEVELS, UserLevel, UserRole, UserTime } from "../../types/user-data";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { redirectToRoute } from "../../store/action";
import { getAuthId, getAuthRole, getAuthorizationStatus, getReisterData, getUser } from "../../store/user-process/selectors";
import { registerAction } from "../../store/api-actions";
import { setRegisterData } from "../../store/user-process/user-process";
import { useNavigate } from "react-router-dom";
import { store } from "../../store";

function PopupQuestionnaireUser(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const authId = useAppSelector(getAuthId);
  const authRole = useAppSelector(getAuthRole);
  const registerUser = useAppSelector(getReisterData);
  if(!registerUser) {
    navigate(AppRoute.SignUp);
  }
  const [formData, setFormData] = useState({
    level: UserLevel.Beginner,
    typeOfTrain: [''],
    timeOfTrain: '',
    caloriesToReset: 0,
    caloriesToSpend: 0,
  });
  const [typesCountError, setTypesCountError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [caloriesToSpendError, setCaloriesToSpendError] = useState(false);
  const [caloriesToResetError, setCaloriesToResetError] = useState(false);

  // useEffect(() => {
  //   if(authRole === UserRole.Coach) {
  //     dispatch(redirectToRoute(`/personal-account/${authId}` as AppRoute));
  //   }
  //   if(authRole === UserRole.User) {
  //     dispatch(redirectToRoute(AppRoute.Main));
  //   }
  // }, [authRole, authId, dispatch]);
  
  const checkTypeChecked = (type: string) => {
    return formData.typeOfTrain.includes(type);
  }

  const handleCaloriesToResetChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormData({...formData, caloriesToReset: +event.target.value});
    if(+event.target.value < CountCaloriesToReset.Min || CountCaloriesToReset.Max < +event.target.value) {
      setIsDisabled(true);
      setCaloriesToResetError(true);
    } else {
      setCaloriesToResetError(false);
      setIsDisabled(false);
    }
  };
  
  const handleCaloriesToSpendChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormData({...formData, caloriesToSpend: +event.target.value});
    if(+event.target.value < CountCaloriesToSpend.Min || CountCaloriesToSpend.Max < +event.target.value) {
      setIsDisabled(true);
      setCaloriesToSpendError(true);
    } else {
      setCaloriesToSpendError(false);
      setIsDisabled(false);
    }
  };

  const onSendForm = () => {
    if (
      formData.timeOfTrain !== '' &&
      formData.caloriesToReset !== 0 &&
      formData.caloriesToSpend !== 0
    ){
      if(registerUser) {
        const newUser = {
          email: registerUser.email,
          name: registerUser.name,
          password: registerUser.password,
          avatarId: registerUser.avatar,
          gender: registerUser.gender,
          dateBirth: registerUser.dateBirth,
          role: registerUser.role,
          description: registerUser.description,
          location: registerUser.location,
          image: registerUser.image,
          level: formData.level,
          typeOfTrain: formData.typeOfTrain,
          certificates: [''],
          trainingReady: false,
          merit: '',
          timeOfTraining: formData.timeOfTrain as UserTime,
          caloriesToReset: formData.caloriesToReset,
          caloriesToSpend: formData.caloriesToSpend
        }
        dispatch(registerAction(newUser))
          .then((serverRusult) => {
            if (serverRusult.type === 'user/register/fulfilled') {
              navigate(AppRoute.SignIn);
            }
          });
        setRegisterData(null);
      }
    }
  };
  return (
    <div className="popup-form popup-form--questionnaire-user">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__form">
            <form
              method="get"
              onSubmit={(evt: FormEvent<HTMLFormElement>) => {
                evt.preventDefault();
                onSendForm();
              }}
            >
              <div className="questionnaire-user">
                <h1 className="visually-hidden">Опросник</h1>
                <div className="questionnaire-user__wrapper">
                  <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Ваша специализация (тип) тренировок</span>
                    <div className="specialization-checkbox questionnaire-user__specializations">
                      {WORKOUT_TYPES.map((item, index) => (
                        <div className="btn-checkbox" key={index}>
                          <label>
                            <input
                              className="visually-hidden"
                              type="checkbox"
                              name="specialisation"
                              value={workoutTypeToValue(item)}
                              onClick={() => {
                                const currentType: string = workoutTypeToValue(item);
                                const types = formData.typeOfTrain.slice();
                                const index = types.indexOf(currentType);
                                if(index !== -1) {
                                  types.splice(index,1);
                                  if(types.length <= MAX_TYPES_COUNT) {
                                    setTypesCountError(false);
                                  }
                                } else if(types.length <= MAX_TYPES_COUNT) {
                                  types.push(currentType);
                                  setTypesCountError(false);
                                } else {
                                  setTypesCountError(true);
                                }
                                setFormData({...formData, typeOfTrain: types});
                              }}
                              checked={checkTypeChecked(workoutTypeToValue(item))}
                            />
                            <span className="btn-checkbox__btn">{workoutTypeToName(item)}</span>
                          </label>
                        </div>
                      ))}
                      {typesCountError && <span className="custom-input__error">{ErrorMessage.TypesCount}</span>}
                    </div>
                  </div>
                  <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Сколько времени вы готовы уделять на тренировку в день</span>
                    <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                    {WORKOUT_TIMES.map((item, index) => (
                        <div className="custom-toggle-radio__block" key={index}>
                          <label>
                            <input
                              className="visually-hidden"
                              type="radio"
                              name="time"
                              value={item}
                              onClick={() => {
                                setFormData({...formData, timeOfTrain: item});
                              }}
                              checked={formData.timeOfTrain === item}
                            />
                            <span className="custom-toggle-radio__icon"></span>
                            <span className="custom-toggle-radio__label">{item}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Ваш уровень</span>
                    <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                    {LEVELS.map((item, index) => (
                        <div className="custom-toggle-radio__block" key={index}>
                          <label>
                            <input
                              className="visually-hidden"
                              type="radio"
                              name="level"
                              value={item}
                              onClick={() => {
                                setFormData({...formData, level: levelToValue(item)});
                              }}
                              checked={formData.level === levelToValue(item)}
                            />
                            <span className="custom-toggle-radio__icon"></span>
                            <span className="custom-toggle-radio__label">{item}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="questionnaire-user__block">
                    <div className="questionnaire-user__calories-lose"><span className="questionnaire-user__legend">Сколько калорий хотите сбросить</span>
                      <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                        <label>
                          <span className="custom-input__wrapper">
                            <input
                              onChange={handleCaloriesToResetChange}
                              value={formData.caloriesToReset}
                              type="number"
                              name="calories-lose"
                            />
                            <span className="custom-input__text">ккал</span>
                          </span>
                        </label>
                      </div>
                    </div>
                    {caloriesToResetError && <span className="custom-input__error">{ErrorMessage.CaloriesToReset}</span>}
                    <div className="questionnaire-user__calories-waste"><span className="questionnaire-user__legend">Сколько калорий тратить в день</span>
                      <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                        <label>
                          <span className="custom-input__wrapper">
                            <input
                              onChange={handleCaloriesToSpendChange}
                              value={formData.caloriesToSpend}
                              type="number"
                              name="calories-waste"
                            />
                            <span className="custom-input__text">ккал</span>
                          </span>
                        </label>
                      </div>
                    </div>
                    {caloriesToSpendError && <span className="custom-input__error">{ErrorMessage.CaloriesToReset}</span>}
                  </div>
                </div>
                <button
                  className="btn questionnaire-user__button"
                  type="submit"
                  disabled={isDisabled}
                >Продолжить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PopupQuestionnaireUser;
