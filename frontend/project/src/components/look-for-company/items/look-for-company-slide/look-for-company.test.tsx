import {fireEvent, getByLabelText, getByTitle, render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../../history-router/history-router';
import LookForCompanySlide from './look-for-company';
import { AuthorizationStatus } from '../../../../constant';
import { user } from '../../../../mocks/users';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: LookForCompanySlide', () => {
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
            <LookForCompanySlide
              id={user.id}
              avatar={user.avatar}
              name={user.name}
              location={user.location}
              typeOfTrain={user.typeOfTrain}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(user.name)).toBeInTheDocument();
  });
});
