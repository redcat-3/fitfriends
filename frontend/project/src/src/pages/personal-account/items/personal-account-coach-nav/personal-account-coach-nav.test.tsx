import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { Provider} from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../../../components/history-router/history-router';
import PersonalAccountCoachNav from './personal-account-coach-nav';
import { user } from '../../../../mocks/users';
import { AuthorizationStatus } from '../../../../constant';
import { notifications } from '../../../../mocks/notifications';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: PersonalAccountCoachNav', () => {
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
            <PersonalAccountCoachNav
              id={user.id}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Мои тренировки/i)).toBeInTheDocument();
  });
});