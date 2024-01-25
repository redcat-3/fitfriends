import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import MyOrdersItem from './my-orders-item/my-orders-item';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOrdersToCoach, getOrdersToCoachCount } from '../../store/reaction-process/selectors';
import { DEFAULT_LIMIT_ORDERS } from '../../constant';
import { fetchOrdersCoachAction } from '../../store/api-actions';

function MyOrders(): JSX.Element {
  const dispatch = useAppDispatch();
  const query = {
    limit: DEFAULT_LIMIT_ORDERS,
    page: 1,
    sortDirection: 'desc',
    sortBy: 'count'
  };
  dispatch(fetchOrdersCoachAction({query}));
  const orders = useAppSelector(getOrdersToCoach);
  const ordersCount = useAppSelector(getOrdersToCoachCount);
  let renderedOrdersCount = orders.length;
  const [isMore, setIsMore] = useState(renderedOrdersCount < ordersCount);
  const [sortByPriceDown, setSortByPriceDown] = useState(true);
  const [sortByCountDown, setSortByCountDown] = useState(true);
  let navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const handleSortByPrice = () => {
    setSortByPriceDown(!sortByPriceDown);
    query.sortBy = 'orderPrice';
    query.sortDirection = sortByPriceDown ? 'desc' : 'asc';
    dispatch(fetchOrdersCoachAction({query}));
  };
  const handleSortByCount = () => {
    setSortByCountDown(!sortByCountDown);
    query.sortBy = 'count';
    query.sortDirection = sortByCountDown ? 'desc' : 'asc';
    dispatch(fetchOrdersCoachAction({query}));
  };

  const handleMoreClick = () => {
    if(ordersCount > renderedOrdersCount) {
      renderedOrdersCount = renderedOrdersCount + DEFAULT_LIMIT_ORDERS;
      query.limit = renderedOrdersCount;
      dispatch(fetchOrdersCoachAction({query}));
      setIsMore(renderedOrdersCount < ordersCount);
    }
  };

  return (
    <div className="wrapper">
      <Helmet>
        <title>FitFriends. Мои заказы</title>
      </Helmet>
      <Header />
      <main>
        <section className="my-orders">
          <div className="container">
            <div className="my-orders__wrapper">
              <button
                className="btn-flat btn-flat--underlined my-orders__back"
                type="button"
                onClick={goBack}
              >
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <div className="my-orders__title-wrapper">
                <h1 className="my-orders__title">Мои заказы</h1>
                <div className="sort-for">
                  <p>Сортировать по:</p>
                  <div className="sort-for__btn-container">
                    <button
                      className="btn-filter-sort"
                      type="button"
                      onClick={handleSortByPrice}
                    ><span>Сумме</span>
                      {sortByPriceDown ?
                        <svg width="16" height="10" aria-hidden="true">
                          <use xlinkHref="#icon-sort-up"></use>
                        </svg> :
                        <svg width="16" height="10" aria-hidden="true">
                          <use xlinkHref="#icon-sort-down"></use>
                        </svg> 
                      }
                    </button>
                    <button
                      className="btn-filter-sort"
                      type="button"
                      onClick={handleSortByCount}
                    ><span>Количеству</span>
                      {sortByCountDown ?
                        <svg width="16" height="10" aria-hidden="true">
                          <use xlinkHref="#icon-sort-up"></use>
                        </svg> :
                        <svg width="16" height="10" aria-hidden="true">
                          <use xlinkHref="#icon-sort-down"></use>
                        </svg> 
                      }
                    </button>
                  </div>
                </div>
              </div>
              <ul className="my-orders__list">
                {orders.map((item, index) => (
                  <MyOrdersItem key={index}
                    orderToCoach={item}
                  />
                ))}
              </ul>
              <div className="show-more my-orders__show-more">
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
        </section>
      </main>
    </div>
  );
}
export default MyOrders;
