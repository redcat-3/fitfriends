import {fireEvent, getByLabelText, getByTitle, render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import PopupBuy from './popup-buy';
import { AuthorizationStatus, RangePriceValue } from '../../constant';
import { user } from '../../mocks/users';
import { createWorkout } from '../../mocks/workouts';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const workout = createWorkout(1);

describe('Component: PopupBuy', () => {
  const store = mockStore({
    workout: {
        workout
      }
    });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <PopupBuy
              background={workout.background}
              name={workout.name}
              price={workout.price}
              onBuyClick={() => {}}
              onClose={() => {}}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Купить тренировку/i)).toBeInTheDocument();
  });
});
