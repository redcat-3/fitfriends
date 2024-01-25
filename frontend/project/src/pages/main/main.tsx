import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import LookForCompany from '../../components/look-for-company/look-for-company';
import PopularTrainings from '../../components/popular-trainings/popular-trainings';
import SpecialForYou from '../../components/special-for-you/special-for-you';
import SpecialOffers from '../../components/special-offers/special-offers';
import { AppRoute } from '../../constant';
import { useRedirectingIfNotAuth } from '../../hooks/use-redirect-if-not-auth';

function Main(): JSX.Element {
  useRedirectingIfNotAuth(AppRoute.SignIn);
  
  return (
    <div className="wrapper">
      <Helmet>
        <title>FitFriends. Главная</title>
      </Helmet>
      <Header />
      <main>
        <h1 className="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
        <SpecialForYou />
        <SpecialOffers />
        <PopularTrainings />
        <LookForCompany />
      </main>
    </div>
  );
}
export default Main;
