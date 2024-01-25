import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constant';
import Intro from '../../pages/intro/intro';
import Main from '../../pages/main/main';
import SignIn from '../../pages/sign-in/sign-in';
import CreateTraning from '../../pages/create-training/create-training';
import FriendsList from '../../pages/friends-list/friends-list';
import MyOrders from '../../pages/my-orders/my-orders';
import MyPurchases from '../../pages/my-purchases/my-purchases';
import MyTranings from '../../pages/my-trainings/my-trainings';
import QuestionnaireCoach from '../../pages/questionnaire-coach/questionnaire-coach';
import QuestionnaireUser from '../../pages/questionnaire-user/questionnaire-user';
import SignUp from '../../pages/sign-up/sign-up';
import TrainingCatalog from '../../pages/training-catalog/training-catalog';
import UserCatalog from '../../pages/users-catalog/users-catalog';
import PersonalAccount from '../../pages/personal-account/personal-account';
import TrainingCard from '../../pages/training-card/training-card';
import UserCard from '../../pages/user-card/user-card';
import NotFound from '../../pages/not-found/not-found';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <ScrollToTop>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<Main />}
            key={AppRoute.Main}
          />
          <Route
            path={AppRoute.Intro}
            element={<Intro/>}
            key={AppRoute.Intro}
          />
          <Route
            path={AppRoute.SignIn}
            element={<SignIn/>}
            key={AppRoute.SignIn}
          />
          <Route
            path={AppRoute.CreateTraining}
            element={<CreateTraning/>}
            key={AppRoute.CreateTraining}
          />
          <Route
            path={AppRoute.FriendsList}
            element={<FriendsList/>}
            key={AppRoute.FriendsList}
          />
          <Route
            path={AppRoute.MyOrders}
            element={<MyOrders/>}
            key={AppRoute.MyOrders}
          />
          <Route
            path={AppRoute.MyPurchases}
            element={<MyPurchases/>}
            key={AppRoute.MyPurchases}
          />
          <Route
            path={AppRoute.MyTrainings}
            element={<MyTranings/>}
            key={AppRoute.MyTrainings}
          />
          <Route
            path={AppRoute.PersonalAccount}
            element={<PersonalAccount/>}
            key={AppRoute.PersonalAccount}
          />
          <Route
            path={AppRoute.QuestionnaireCoach}
            element={<QuestionnaireCoach/>}
            key={AppRoute.QuestionnaireCoach}
          />
          <Route
            path={AppRoute.QuestionnaireUser}
            element={<QuestionnaireUser/>}
            key={AppRoute.QuestionnaireUser}
          />
          <Route
            path={AppRoute.SignUp}
            element={<SignUp/>}
            key={AppRoute.SignUp}
          />
          <Route
            path={AppRoute.TrainingCard}
            element={<TrainingCard/>}
            key={AppRoute.TrainingCard}
          />
          <Route
            path={AppRoute.TrainingCatalog}
            element={<TrainingCatalog/>}
            key={AppRoute.TrainingCatalog}
          />
          <Route
            path={AppRoute.UserCard}
            element={<UserCard/>}
            key={AppRoute.UserCard}
          />
          <Route
            path={AppRoute.UsersCatalog}
            element={<UserCatalog/>}
            key={AppRoute.UsersCatalog}
          />
          <Route
            path={AppRoute.Error404}
            element={<NotFound/>}
            key={AppRoute.Error404}
          />
        </Routes>
      </ScrollToTop>
    </HelmetProvider>
  );
}
export default App;
