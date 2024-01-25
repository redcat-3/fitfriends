import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { Provider} from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../../history-router/history-router';
import SpecialForYouSlide from './special-for-you-slide';
import { user } from '../../../../mocks/users';
import { AuthorizationStatus } from '../../../../constant';
import { generateFeedback } from '../../../../mocks/feedbacks';
import { createWorkout } from '../../../../mocks/workouts';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const workout = createWorkout(1);

describe('Component: ReviewsSideBarItem', () => {
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
            <SpecialForYouSlide
              workoutId={workout.workoutId}
              name={workout.name}
              background={workout.background}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(workout.name)).toBeInTheDocument();
  });
});
