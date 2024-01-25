import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { Provider} from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import UserInfoEdit from './user-info-edit';
import { user } from '../../mocks/users';
import { AuthorizationStatus } from '../../constant';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: UserInfoEdit', () => {
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
            <UserInfoEdit
              id={user.id}
              avatar={user.avatar}
              name={user.name}
              description={user.description}
              location={user.location}
              typeOfTrain={user.typeOfTrain}
              trainingReady={user.trainingReady}
              level={user.level}
              gender={user.gender}
              role={user.role}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Имя/i)).toBeInTheDocument();
  });
});
