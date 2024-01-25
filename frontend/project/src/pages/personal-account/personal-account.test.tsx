import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { Provider} from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-router/history-router';
import PersonalAccount from './personal-account';
import { user } from '../../mocks/users';
import { AuthorizationStatus } from '../../constant';
import { notifications } from '../../mocks/notifications';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: PersonalAccount', () => {
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
            <PersonalAccount/>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Личный кабинет/i)).toBeInTheDocument();
  });
});