import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { Provider} from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import PopupSignUp from './popup-sign-up';
import { user } from '../../mocks/users';
import { AuthorizationStatus } from '../../constant';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: PopupSignUp', () => {
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
            <PopupSignUp/>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Регистрация/i)).toBeInTheDocument();
  });
});
