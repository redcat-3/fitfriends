import {fireEvent, getByLabelText, getByTitle, render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import Header from './header';
import { AuthorizationStatus } from '../../constant';
import { user } from '../../mocks/users';
import { notifications } from '../../mocks/notifications';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Header', () => {
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
            <Header/>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTitle('header')).toBeInTheDocument();
  });
});
