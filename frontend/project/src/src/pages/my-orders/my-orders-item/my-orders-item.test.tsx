import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { Provider} from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../../components/history-router/history-router';
import MyOrdersItem from './my-orders-item';
import { user, users } from '../../../mocks/users';
import { AuthorizationStatus } from '../../../constant';
import { notifications } from '../../../mocks/notifications';
import { generateOrderToCoach } from '../../../mocks/orders';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const orderToCoach = generateOrderToCoach(1);

describe('Component: MyOrdersItem', () => {
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
            <MyOrdersItem
              orderToCoach={orderToCoach}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Куплено тренировок/i)).toBeInTheDocument();
  });
});
