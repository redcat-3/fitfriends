import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { Provider} from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import UserCatalogForm from './user-catalog-form';
import { user } from '../../mocks/users';
import { AuthorizationStatus } from '../../constant';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: UserCatalogForm', () => {
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
            <UserCatalogForm
              level={user.level}
              location={user.location}
              role={user.role}
              typeOfTrain={user.typeOfTrain}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Фильтры/i)).toBeInTheDocument();
  });
});
