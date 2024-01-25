import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { Provider} from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-router/history-router';
import Intro from './intro';
import { user, users } from '../../mocks/users';
import { AuthorizationStatus } from '../../constant';
import { notifications } from '../../mocks/notifications';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Intro', () => {
  const store = mockStore({
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Intro/>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Есть аккаунт?/i)).toBeInTheDocument();
  });
});
