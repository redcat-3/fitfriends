import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { Provider} from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import TraningsItem from './trainings-item';
import { user } from '../../mocks/users';
import { AuthorizationStatus } from '../../constant';
import { createWorkout } from '../../mocks/workouts';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const workout = createWorkout(1);

describe('Component: TraningsItem', () => {
  const store = mockStore({
    user: {
      authorizationStatus: AuthorizationStatus.Auth,
      user
    }
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <TraningsItem
              workout={workout}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(workout.name)).toBeInTheDocument();
  });
});
