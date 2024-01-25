import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import { AuthorizationStatus, AppRoute } from '../../constant';
import App from './app';
import { createWorkout, workouts } from '../../mocks/workouts';
import { user, users } from '../../mocks/users';
import { notifications } from '../../mocks/notifications';
import { orders, ordersToCoach1 } from '../../mocks/orders';
import { createFeedbacks } from '../../mocks/feedbacks';
import { HelmetProvider } from 'react-helmet-async';

const mockStore = configureMockStore();
const COUNT = 10;

const store = mockStore({
  user: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    user,
    users,
    usersCount: COUNT,
    isUsersDataLoading: false,
    friendsList: [],
  },
  workout: {
    workout: createWorkout(1),
    workouts,
    isWorkoutsDataLoading: false,
    workoutsCount: COUNT,
    filteredWorkouts: workouts
  },
  reaction: {
    notifications,
    orders,
    ordersToCoach: ordersToCoach1,
    isOrdersDataLoading: false,
    ordersCount: COUNT,
    ordersToCoachCount: COUNT,
    feedbacks: createFeedbacks(2, 1),
    requests: [],
  }
});

window.scrollTo = jest.fn();

window.HTMLMediaElement.prototype.play = () => new Promise((resolve) => {
  resolve();});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store} key={'1'}>
    <HistoryRouter history={history} key={'2'}>
      <HelmetProvider key={'3'}>
        <App key={'4'}/>
      </HelmetProvider>
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Main" when user navigate to "/main"', () => {
    history.push(AppRoute.Main);
    render(fakeApp);
    expect(screen.getByText(/FitFriends — Время находить/i)).toBeInTheDocument();
  });

  it('should render "Intro" when user navigate to "/"', () => {
    history.push(AppRoute.Intro);
    render(fakeApp);
    expect(screen.getByText(/Вход/i)).toBeInTheDocument();
  });

  it('should render "SignIn" when user navigate to "/login"', () => {
    history.push(AppRoute.SignIn);
    render(fakeApp);
    expect(screen.getByText(/Вход/i)).toBeInTheDocument();
  });

  it('should render "CreateTraining" when user navigate to "/create-training"', () => {
    history.push(AppRoute.CreateTraining);
    render(fakeApp);
    expect(screen.getByText(/Создание тренировки/i)).toBeInTheDocument();
  });

  it('should render "FriendsList" when user navigate to "/friends-list/:id"', () => {
    history.push(`/friends-list/${user.id}`);
    render(fakeApp);
    expect(screen.getByText(/Мои друзья/i)).toBeInTheDocument();
  });

  it('should render "MyOrders" when user navigate to "/my-orders/:id"', () => {
    history.push(`/my-orders/${user.id}`);
    render(fakeApp);
    expect(screen.getByText(/Мои заказы/i)).toBeInTheDocument();
  });

  it('should render "MyPurchases" when user navigate to "/my-purchases/:id"', () => {
    history.push(`/my-purchases/${user.id}`);
    render(fakeApp);
    expect(screen.getByText(/Мои покупки/i)).toBeInTheDocument();
  });

  it('should render "PersonalAccount" when user navigate to "/personal-account/:id"', () => {
    history.push(`/personal-account/${user.id}`);
    render(fakeApp);
    expect(screen.getByText(/Личный кабинет/i)).toBeInTheDocument();
  });

  it('should render "QuestionnaireCoach" when user navigate to "/questionnaire-coach"', () => {
    history.push(AppRoute.QuestionnaireCoach);
    render(fakeApp);
    expect(screen.getByText(/Ваша специализация/i)).toBeInTheDocument();
  });

  it('should render "QuestionnaireUser" when user navigate to "/questionnaire-user"', () => {
    history.push(AppRoute.QuestionnaireUser);
    render(fakeApp);
    expect(screen.getByText(/Ваша специализация/i)).toBeInTheDocument();
  });

  it('should render "SignUp" when user navigate to "/registr"', () => {
    history.push(AppRoute.SignUp);
    render(fakeApp);
    expect(screen.getByText(/Регистрация/i)).toBeInTheDocument();  
  });

  it('should render "TrainingCard" when user navigate to "/training-card/:id"', () => {
    history.push(`/training-card/${workouts[1].workoutId}`);
    render(fakeApp);
    expect(screen.getByText(/Карточка тренировки/i)).toBeInTheDocument();
  });

  it('should render "UserCard" when user navigate to "/user-card/:id"', () => {
    history.push(`/user-card/${user.id}`);
    render(fakeApp);
    expect(screen.getByText(/Карточка пользователя/i)).toBeInTheDocument();
  });

  it('should render "UsersCatalog" when user navigate to "/users-catalog"', () => {
    history.push(AppRoute.UsersCatalog);
    render(fakeApp);
    expect(screen.getByText(/Каталог пользователей/i)).toBeInTheDocument();
  });

  it('should render "Error404" when user navigate to "/error404"', () => {
    history.push(AppRoute.Error404);
    render(fakeApp);
    expect(screen.getByText(/К сожалению ничего не нашлось/i)).toBeInTheDocument();
  });
});