import { Link } from "react-router-dom";
import { AppRoute } from "../../../../constant";
import BlockNews from "../../../../components/bock-news/block-news";

type PersonalAccountCoachNavProps = {
  id: string,
  newsItem?: string,
  img?: string
};

function PersonalAccountCoachNav({id, newsItem, img}: PersonalAccountCoachNavProps): JSX.Element {
  return (
    <div className="personal-account-coach__navigation">
      <Link to={`/my-trainings/${id}` as AppRoute} className="thumbnail-link thumbnail-link--theme-light">
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
          <svg width="30" height="26" aria-hidden="true">
            <use xlinkHref="#icon-flash"></use>
          </svg>
        </div>
        <span className="thumbnail-link__text">Мои тренировки</span>
      </Link>
      <Link to={AppRoute.CreateTraining} className="thumbnail-link thumbnail-link--theme-light">
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
          <svg width="30" height="26" aria-hidden="true">
            <use xlinkHref="#icon-add"></use>
          </svg>
        </div>
        <span className="thumbnail-link__text">Создать тренировку</span>
      </Link>
      <Link to={`/friends-list/${id}` as AppRoute} className="thumbnail-link thumbnail-link--theme-light">
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
          <svg width="30" height="26" aria-hidden="true">
            <use xlinkHref="#icon-friends"></use>
          </svg>
        </div>
        <span className="thumbnail-link__text">Мои друзья</span>
      </Link>
      <Link to={`/my-orders/${id}` as AppRoute} className="thumbnail-link thumbnail-link--theme-light">
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
          <svg width="30" height="26" aria-hidden="true">
            <use xlinkHref="#icon-bag"></use>
          </svg>
        </div>
        <span className="thumbnail-link__text">Мои заказы</span>
      </Link>
      <div className="personal-account-coach__calendar">
        <BlockNews newsItem={newsItem} img={img} />
      </div>
    </div>
  );
}
export default PersonalAccountCoachNav;
