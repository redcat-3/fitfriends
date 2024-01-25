import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../../history-router/history-router';
import HeaderLogo from './header-logo';
import { AuthorizationStatus } from '../../../../constant';
import { user } from '../../../../mocks/users';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: HeaderLogo', () => {
  const store = mockStore({
    user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: user
      },
    });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <HeaderLogo/>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    const element = screen.getByTitle('header-logo');
    expect(element).toBeInTheDocument();
  });
});
