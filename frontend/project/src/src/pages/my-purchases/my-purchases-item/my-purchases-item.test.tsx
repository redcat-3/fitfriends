import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { Provider} from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../../components/history-router/history-router';
import MyPurchasesItem from './my-purchases-item';
import { user, users } from '../../../mocks/users';
import { AuthorizationStatus } from '../../../constant';
import { notifications } from '../../../mocks/notifications';
import { generateOrderToCoach } from '../../../mocks/orders';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: MyPurchasesItem', () => {
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
            <MyPurchasesItem
              id={1}
              workoutId={1}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
  });
});
