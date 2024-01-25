import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { Provider} from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import SpecialForYou from './special-for-you';
import { user } from '../../mocks/users';
import { AuthorizationStatus } from '../../constant';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: ReviewsSideBarItem', () => {
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
            <SpecialForYou/>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Специально подобрано для вас/i)).toBeInTheDocument();
  });
});
