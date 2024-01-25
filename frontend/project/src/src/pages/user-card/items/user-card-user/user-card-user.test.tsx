import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { Provider} from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../../../components/history-router/history-router';
import UserCardUser from './user-card-user';
import { user } from '../../../../mocks/users';
import { AuthorizationStatus } from '../../../../constant';
import { notifications } from '../../../../mocks/notifications';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: UserCardUser', () => {
  const store = mockStore({
    user: {
      authorizationStatus: AuthorizationStatus.Auth,
      user,
      friendsList: [],
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
            <UserCardUser 
              onMapUserClick={() => {}}
              id={user.id}
              name={user.name}
              trainingReady={user.trainingReady}
              description={user.description}
              typeOfTrain={user.typeOfTrain}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Карточка пользователя/i)).toBeInTheDocument();
  });
});