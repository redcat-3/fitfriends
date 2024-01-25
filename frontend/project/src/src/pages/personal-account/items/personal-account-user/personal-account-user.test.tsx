import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { Provider} from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../../../components/history-router/history-router';
import PersonalAccountUser from './personal-account-user';
import { user } from '../../../../mocks/users';
import { AuthorizationStatus } from '../../../../constant';
import { notifications } from '../../../../mocks/notifications';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: PersonalAccountUser', () => {
  const store = mockStore({
    user: {
      authorizationStatus: AuthorizationStatus.Auth,
      user
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
            <PersonalAccountUser/>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/План на день, ккал/i)).toBeInTheDocument();
  });
});