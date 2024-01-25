import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { Provider} from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import UsersCatalogItem from './users-catalog-item';
import { user } from '../../mocks/users';
import { AuthorizationStatus } from '../../constant';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: UsersCatalogItem', () => {
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
            <UsersCatalogItem
              id={user.id}
              name={user.name}
              location={user.location}
              avatar={user.avatar}
              typeOfTrain={user.typeOfTrain}
              role={user.role}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(user.name)).toBeInTheDocument();
  });
});
