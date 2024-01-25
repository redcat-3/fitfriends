import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { Provider} from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-router/history-router';
import Main from './main';
import { user, users } from '../../mocks/users';
import { AuthorizationStatus } from '../../constant';
import { notifications } from '../../mocks/notifications';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Main', () => {
  const store = mockStore({
    user: {
      authorizationStatus: AuthorizationStatus.Auth,
      user,
      users
    },
    reaction: {
      notifications
    }
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Main/>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/FitFriends — Время находить/i)).toBeInTheDocument();
  });
});
