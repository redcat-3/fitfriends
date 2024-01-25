import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { Provider} from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../../../components/history-router/history-router';
import UserCardCoach from './user-card-coach';
import { coach } from '../../../../mocks/users';
import { AuthorizationStatus } from '../../../../constant';
import { notifications } from '../../../../mocks/notifications';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: UserCardCoach', () => {
  const store = mockStore({
    user: {
      authorizationStatus: AuthorizationStatus.Auth,
      user: coach,
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
            <UserCardCoach 
              onMapClick={() => {}}
              onCertificateClick={() => {}}
              id={coach.id}
              name={coach.name}
              trainingReady={coach.trainingReady}
              description={coach.description}
              typeOfTrain={coach.typeOfTrain}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Карточка пользователя роль тренер/i)).toBeInTheDocument();
  });
});