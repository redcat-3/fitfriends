import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import MyPurchasesItem from './my-purchases-item/my-purchases-item';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOrders, getOrdersCount, getOrdersDataLoadingStatus } from '../../store/reaction-process/selectors';
import { useState } from 'react';
import { AppRoute, DEFAULT_LIMIT_ORDERS } from '../../constant';
import { redirectToRoute } from '../../store/action';
import { fetchOrdersUserAction } from '../../store/api-actions';

function MyPurchases(): JSX.Element {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  dispatch(fetchOrdersUserAction);
  const isOrdersDataLoading = useAppSelector(getOrdersDataLoadingStatus);
  const orders = useAppSelector(getOrders);
  const ordersCount = useAppSelector(getOrdersCount);
  let renderedOrdersCount = DEFAULT_LIMIT_ORDERS;
  const [isMore, setIsMore] = useState(renderedOrdersCount < ordersCount);
  const [onlyActive, setOnlyActive] = useState(false);
  let filteredOrders;
  if (onlyActive) {
    filteredOrders = orders.filter((item) => item.count !== 0)
  } else {
    filteredOrders = orders;
  }
  let renderedOrders = filteredOrders.slice(0, renderedOrdersCount);
  const handleMoreClick = () => {
    if(ordersCount > renderedOrdersCount) {
      renderedOrdersCount = renderedOrdersCount + DEFAULT_LIMIT_ORDERS;
      renderedOrders = orders.slice(0, renderedOrdersCount)
      setIsMore(renderedOrdersCount < ordersCount);
    }
  };
  const handleOnlyActiveClick = () => {
    setOnlyActive(!onlyActive);
    if (onlyActive) {
      filteredOrders = orders.filter((item) => item.count !== 0)
    } else {
      filteredOrders = orders;
    }
    renderedOrdersCount = DEFAULT_LIMIT_ORDERS;
    renderedOrders = filteredOrders.slice(0, renderedOrdersCount);
  }
  const handleTopClick = () => {
    dispatch(redirectToRoute(AppRoute.Main));
  }
  const goBack = () => {
    navigate(-1);
  };

  if(isOrdersDataLoading) {
    return <div className="wrapper">
    <Helmet>
      <title>FitFriends. Мои покупки</title>
    </Helmet>
    <Header />
    <main>
      <section className="friends-list">
        <div className="container">
          <div className="friends-list__wrapper">
            <div className="friends-list__title-wrapper">
              <h1 className="friends-list__title">Мои покупки загружаются ...</h1>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>;
  }
  return (
    <div className="wrapper">
      <Helmet>
        <title>FitFriends. Мои покупки</title>
      </Helmet>
      <Header />
      <main>
        <section className="my-purchases">
          <div className="container">
            <div className="my-purchases__wrapper">
              <button
                className="btn-flat my-purchases__back"
                type="button"
                onClick={goBack}
              >
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
                <span>Назад</span>
              </button>
              <div className="my-purchases__title-wrapper">
                <h1 className="my-purchases__title">Мои покупки</h1>
                <div className="my-purchases__controls">
                  <div className="custom-toggle custom-toggle--switch custom-toggle--switch-right my-purchases__switch" data-validate-type="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value="user-agreement-1"
                        name="user-agreement"
                        onChange={handleOnlyActiveClick}
                      />
                      <span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg>
                      </span>
                      <span className="custom-toggle__label">Только активные</span>
                    </label>
                  </div>
                </div>
              </div>
              <ul className="my-purchases__list">
                {renderedOrders.map((item, index) => (
                  <MyPurchasesItem key={index}
                    id={item.orderId}
                    workoutId={item.workoutId}
                  />
                ))}
              </ul>
              <div className="show-more my-purchases__show-more">
                {isMore && 
                  <button
                    className="btn show-more__button show-more__button--more"
                    type="button"
                    onClick={handleMoreClick}
                  >Показать еще
                  </button>
                }
                <button
                  className="btn show-more__button show-more__button--to-top"
                  type="button"
                  onClick={handleTopClick}
                >Вернуться в начало</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default MyPurchases;
