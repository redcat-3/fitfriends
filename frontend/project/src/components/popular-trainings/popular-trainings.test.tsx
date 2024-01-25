import {fireEvent, getByLabelText, getByTitle, render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import PopularTranings from './popular-trainings';
import { AuthorizationStatus, RangePriceValue } from '../../constant';
import { user } from '../../mocks/users';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: PopularTranings', () => {
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
            <PopularTranings/>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Популярные тренировки/i)).toBeInTheDocument();
  });
});
