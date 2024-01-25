import { useAppSelector } from '../../../../hooks';
import { getUser } from '../../../../store/user-process/selectors';
import { Link } from 'react-router-dom';
import BlockNews from '../../../../components/bock-news/block-news';
import { UserUser } from '../../../../types/user-data';

function PersonalAccountUser(): JSX.Element {
  const user = useAppSelector(getUser) as UserUser;
  return (
    <div className="inner-page__content">
      <div className="personal-account-user">
        <div className="personal-account-user__schedule">
          <form
            action="#"
            method="get"
          >
            <div className="personal-account-user__form">
              <div className="personal-account-user__input">
                <label>
                  <span className="personal-account-user__label">План на день, ккал</span>
                  <input
                    type="text"
                    name="schedule-for-the-day"
                    value={user.caloriesToReset}
                    disabled={true}
                  />
                </label>
              </div>
              <div className="personal-account-user__input">
                <label>
                  <span className="personal-account-user__label">План на неделю, ккал</span>
                  <input
                    type="text"
                    name="schedule-for-the-week"
                    value={user.caloriesToReset*7}
                    disabled={true}
                  />
                </label>
              </div>
            </div>
          </form>
        </div>
        <div className="personal-account-user__additional-info">
          <Link to={`/friends-list/${user.id}`} className="thumbnail-link thumbnail-link--theme-light">
            <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
              <svg width="30" height="26" aria-hidden="true">
                <use xlinkHref="#icon-friends"></use>
              </svg>
            </div>
            <span className="thumbnail-link__text">Мои друзья</span>
          </Link>
          <Link to={`/my-purchases/${user.id}`} className="thumbnail-link thumbnail-link--theme-light">
            <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
              <svg width="30" height="26" aria-hidden="true">
                <use xlinkHref="#icon-shopping-cart"></use>
              </svg>
            </div>
            <span className="thumbnail-link__text">Мои покупки</span>
          </Link>
          <BlockNews />          
        </div>
      </div>
    </div>

  );
}
export default PersonalAccountUser;
