import { NavLink } from "react-router-dom";
import Notification from "../notification/notification";
import { AppRoute } from "../../../../constant";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { getNotifications} from "../../../../store/reaction-process/selectors";
import { fetchNotificationDeleteAction } from '../../../../store/api-actions';
import { store } from "../../../../store";

type MainNavProps = {
  userId: string,
};

function MainNav ({userId}: MainNavProps): JSX.Element {
  const notifications = useAppSelector(getNotifications);
  const OnNotificationClick = (notificationId: number) => {
    store.dispatch(fetchNotificationDeleteAction({id: notificationId}));
  }
  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        <li className="main-nav__item" key="icon-home">
          <NavLink title="icon-home"
            end
            className={({isActive}) => isActive ? "main-nav__link is-active" : "main-nav__link"}
            aria-label="На главную"
            to={AppRoute.Main}>
            <svg width="18" height="18" aria-hidden="true">
              <use xlinkHref="#icon-home"></use>
            </svg>
          </NavLink>
        </li>
        <li className="main-nav__item" key="icon-user">
          <NavLink title="icon-user"
            to={userId === '' ? AppRoute.Main : `/personal-account/${userId}`}
            end
            className={({isActive}) => isActive ? "main-nav__link is-active" : "main-nav__link"}
            aria-label="Личный кабинет"
          >
            <svg width="16" height="18" aria-hidden="true">
              <use xlinkHref="#icon-user"></use>
            </svg>
          </NavLink>
        </li>
        <li className="main-nav__item" key="icon-friends">
          <NavLink title="icon-friends"
            to={userId === '' ? AppRoute.Main : `/friends-list/${userId}`}
            end
            className={({isActive}) => isActive ? "main-nav__link is-active" : "main-nav__link"}
            aria-label="Друзья"
          >
            <svg width="22" height="16" aria-hidden="true">
              <use xlinkHref="#icon-friends"></use>
            </svg>
          </NavLink>
        </li>
        <li key="notifications" className={notifications.length === 0 ? "main-nav__item main-nav__item--notifications" : "main-nav__item main-nav__item--notifications is-notifications"}>
          <div
            className="main-nav__link"
            aria-label="Уведомления"
          >
            <svg width="14" height="18" aria-hidden="true">
              <use xlinkHref="#icon-notification"></use>
            </svg>
          </div>
          <div className="main-nav__dropdown">
            <p className="main-nav__label">Оповещения</p>
            <ul className="main-nav__sublist" title="notifications">
              {notifications.map((item, index) => (
                <Notification key={index}
                  notificationId={item.notificationId}
                  text={item.text}
                  createdDate={item.createdDate}
                  isNotificationActive={item.isActive}
                  OnNotificationClick={() => {
                    item.isActive=false;
                    OnNotificationClick
                  }}
                />
              ))}
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  )
};
export default MainNav;
