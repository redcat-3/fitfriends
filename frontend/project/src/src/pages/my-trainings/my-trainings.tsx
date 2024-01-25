import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import TraningsItem from '../../components/trainings-item/trainings-item';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CountCaloriesToSpend, DEFAULT_LIMIT, RangePriceValue, RangeRatingValue } from '../../constant';
import MultiRangeSlider from '../../components/multi-range-slider/multi-range-slider';
import { WORKOUT_TIMES } from '../../types/workout-data';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCoachWorkouts } from '../../store/workout-process/selectors';
import { TrainigQuery } from '../../types/query';
import { fetchWorkoutsCoachAction, fetchWorkoutsCoachQueryAction } from '../../store/api-actions';

const TIMES = [
  '10 мин - 30 мин',
  '30 мин - 50 мин',
  '50 мин - 80 мин',
  '80 мин - 100 мин'
] as const;


function MyTranings(): JSX.Element {
  const dispatch = useAppDispatch();
  dispatch(fetchWorkoutsCoachAction);
  let navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const timesAll = WORKOUT_TIMES.slice();
  const [price, setPrice] = useState({ min: RangePriceValue.Min, max: RangePriceValue.Max });
  const [caloriesCount, setCaloriesCount] = useState({ min: CountCaloriesToSpend.Min, max: CountCaloriesToSpend.Max });
  const [rating, setRating] = useState({ min: RangeRatingValue.Min, max: RangeRatingValue.Max });
  const [times, setTimes] = useState(timesAll);
  const filterQuery: TrainigQuery = {
    priceMax: price.max,
    priceMin: price.min,
    caloriesMax: caloriesCount.max,
    caloriesMin: caloriesCount.min,
    ratingMax: rating.max,
    ratingMin: rating.min,
    times,
  }
  const workouts = useAppSelector(getCoachWorkouts);
  const workoutsCount = workouts.length;
  let renderedWorkoutsCount = DEFAULT_LIMIT;
  const [isMore, setIsMore] = useState(renderedWorkoutsCount < workoutsCount);
  const handleMoreClick = () => {
    if(workoutsCount > renderedWorkoutsCount) {
      renderedWorkoutsCount = renderedWorkoutsCount + DEFAULT_LIMIT;
      workouts.slice(0, renderedWorkoutsCount)
      setIsMore(renderedWorkoutsCount < workoutsCount);
    }
  };
  const onChangePrice = ({min, max}: {min: number, max: number}) => {
    setPrice({ min, max });
    filterQuery.priceMin = min;
    filterQuery.priceMax = max;
    const query = {
      limit: 0,
      page: 0,
      sortBy: '',
      caloriesToSpend: `${filterQuery.caloriesMin},${filterQuery.caloriesMax}`,
      price: `${filterQuery.priceMin},${filterQuery.priceMax}`,
      rating: `${filterQuery.ratingMin},${filterQuery.ratingMax}`,
      timeOfTraining: filterQuery.times.join(','),
      sortDirection: ''
    };
    dispatch(fetchWorkoutsCoachQueryAction(query));
  };
  const onChangeCaloriesCount = ({min, max}: {min: number, max: number}) => {
    setCaloriesCount({ min, max });
    filterQuery.caloriesMin = min;
    filterQuery.caloriesMax = max;
    const query = {
      limit: 0,
      page: 0,
      sortBy: '',
      caloriesToSpend: `${filterQuery.caloriesMin},${filterQuery.caloriesMax}`,
      price: `${filterQuery.priceMin},${filterQuery.priceMax}`,
      rating: `${filterQuery.ratingMin},${filterQuery.ratingMax}`,
      timeOfTraining: filterQuery.times.join(','),
      sortDirection: ''
    };
    dispatch(fetchWorkoutsCoachQueryAction(query));
  };
  const onChangeRating = ({min, max}: {min: number, max: number}) => {
    setRating({ min, max });
    filterQuery.ratingMin = min;
    filterQuery.ratingMax = max;
    const query = {
      limit: 0,
      page: 0,
      sortBy: '',
      caloriesToSpend: `${filterQuery.caloriesMin},${filterQuery.caloriesMax}`,
      price: `${filterQuery.priceMin},${filterQuery.priceMax}`,
      rating: `${filterQuery.ratingMin},${filterQuery.ratingMax}`,
      timeOfTraining: filterQuery.times.join(','),
      sortDirection: ''
    };
    dispatch(fetchWorkoutsCoachQueryAction(query));
  };
  
  return (
    <div className="wrapper">
      <Helmet>
        <title>FitFriends. Мои тренировки</title>
      </Helmet>
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Мои тренировки</h1>
              <div className="my-training-form">
                <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
                <div className="my-training-form__wrapper">
                  <button
                    className="btn-flat btn-flat--underlined my-training-form__btnback"
                    type="button"
                    onClick={goBack}
                  >
                    <svg width="14" height="10" aria-hidden="true">
                      <use xlinkHref="#arrow-left"></use>
                    </svg>
                    <span>Назад</span>
                  </button>
                  <h3 className="my-training-form__title">фильтры</h3>
                  <form
                    className="my-training-form__form"
                  >
                    <div className="my-training-form__block my-training-form__block--price">
                      <h4 className="my-training-form__block-title">Цена, ₽</h4>
                      <MultiRangeSlider
                        withValue={true}
                        minMax={false}
                        min={RangePriceValue.Min}
                        max={RangePriceValue.Max}
                        onChange={onChangePrice}
                      ></MultiRangeSlider>
                    </div>
                    <div className="my-training-form__block my-training-form__block--calories">
                      <h4 className="my-training-form__block-title">Калории</h4>
                      <MultiRangeSlider
                        withValue={true}
                        minMax={false}
                        min={CountCaloriesToSpend.Min}
                        max={CountCaloriesToSpend.Max}
                        onChange={onChangeCaloriesCount}
                      ></MultiRangeSlider>
                    </div>
                    <div className="my-training-form__block my-training-form__block--raiting">
                      <h4 className="my-training-form__block-title">Рейтинг</h4>
                      <MultiRangeSlider
                        withValue={false}
                        minMax={true}
                        min={RangeRatingValue.Min}
                        max={RangeRatingValue.Max}
                        onChange={onChangeRating}
                      ></MultiRangeSlider>
                    </div>
                    <div className="my-training-form__block my-training-form__block--duration">
                      <h4 className="my-training-form__block-title">Длительность</h4>
                      <ul className="my-training-form__check-list">
                        {WORKOUT_TIMES.map((item, index) => (
                          <li className="my-training-form__check-list-item" key={index}>                          
                            <div className="custom-toggle custom-toggle--checkbox">
                              <label>
                                <input
                                  type="checkbox"
                                  value={item}
                                  name="duration"
                                  onClick={() => {
                                    const timesNew = times.slice();
                                    const index = timesNew.indexOf(item);
                                    if(index !== -1) {
                                      timesNew.splice(index,1);
                                    } else {
                                      timesNew.push(item);
                                    }
                                    setTimes(timesNew);
                                    filterQuery.times = timesNew;
                                  }}
                                  checked={times.includes(item)}
                                />
                                <span className="custom-toggle__icon">
                                  <svg width="9" height="6" aria-hidden="true">
                                    <use xlinkHref="#arrow-check"></use>
                                  </svg>
                                </span>
                                <span className="custom-toggle__label">{TIMES[index]}</span>
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </form>
                </div>
              </div>
              <div className="inner-page__content">
                <div className="my-trainings">
                  <ul className="my-trainings__list">
                    {workouts.slice(0, renderedWorkoutsCount).map((item, index) => (
                      <TraningsItem key={index}
                        workout={item}
                      />
                    ))}
                  </ul>
                  <div className="show-more my-trainings__show-more">
                    {isMore && <button
                      className="btn show-more__button show-more__button--more"
                      type="button"
                      onClick={handleMoreClick}
                    >Показать еще
                    </button>
                    }
                    <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default MyTranings;
