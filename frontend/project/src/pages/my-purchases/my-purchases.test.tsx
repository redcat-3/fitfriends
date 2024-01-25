import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { Provider} from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-router/history-router';
import MyPurchases from './my-purchases';
import { user, users } from '../../mocks/users';
import { AuthorizationStatus } from '../../constant';
import { notifications } from '../../mocks/notifications';
import { orders } from '../../mocks/orders';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const COUNT_OF_ORDERS = 10;

describe('Component: MyPurchases', () => {
  const store = mockStore({
    user: {
      authorizationStatus: AuthorizationStatus.Auth,
      user
    },
    reaction: {
      notifications,
      orders,
      isOrdersDataLoading: false,
      ordersCount: COUNT_OF_ORDERS,
    }
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <MyPurchases/>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Мои покупки/i)).toBeInTheDocument();
  });
});
