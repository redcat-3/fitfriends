import {fireEvent, getByLabelText, getByTitle, render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../../history-router/history-router';
import TraningsSlide from './traning-slide';
import { AuthorizationStatus, RangePriceValue } from '../../../../constant';
import { user } from '../../../../mocks/users';
import { createWorkout } from '../../../../mocks/workouts';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const workout = createWorkout(1);

describe('Component: TraningsSlide', () => {
  const store = mockStore({
    workout: {
        authorizationStatus: AuthorizationStatus.Auth,
        user
      }
    });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <TraningsSlide
              workout={workout}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(workout.name)).toBeInTheDocument();
    expect(screen.getByText(workout.description)).toBeInTheDocument();
  });
});
