import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { Provider} from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-router/history-router';
import TrainingCard from './training-card';
import { AuthorizationStatus } from '../../constant';
import { user } from '../../mocks/users';
import { createWorkout } from '../../mocks/workouts';
import { createFeedbacks } from '../../mocks/feedbacks';
import { notifications } from '../../mocks/notifications';

const mockStore = configureMockStore();
const history = createMemoryHistory();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({
        id: '1',
    })
  }));

describe('Component: TrainingCard', () => {
  const store = mockStore({
    user: {
      authorizationStatus: AuthorizationStatus.Auth,
      user
    },
    workout: {
      workout: createWorkout(1)
    },
    reaction: {
      feedbacks: createFeedbacks(4, 1),
      notifications
    }
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <TrainingCard/>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Карточка тренировки/i)).toBeInTheDocument();
  });
});