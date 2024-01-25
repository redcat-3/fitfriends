import {fireEvent, getByLabelText, getByTitle, render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../../history-router/history-router';
import MainNav from './main-nav';
import { AuthorizationStatus } from '../../../../constant';
import { user } from '../../../../mocks/users';
import { notifications } from '../../../../mocks/notifications';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: MainNav', () => {
  const store = mockStore({
    user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user
      },
    reaction: {
        notifications,
    }
    });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <MainNav userId={user.id}/>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTitle('icon-home')).toBeInTheDocument();
    expect(screen.getByTitle('icon-user')).toBeInTheDocument();
    expect(screen.getByTitle('icon-friends')).toBeInTheDocument();
    expect(screen.getByText(/Оповещения/i)).toBeInTheDocument();
  });
});
