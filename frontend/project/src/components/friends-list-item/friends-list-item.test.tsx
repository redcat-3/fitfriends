import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import FriendsListItem from './friends-list-item';
import { AuthorizationStatus } from '../../constant';
import { coach, user } from '../../mocks/users';
import { UserRole } from '../../types/user-data';


const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: FriendsListItem, role: user', () => {
  const store = mockStore({
    user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: user
      },
    });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <FriendsListItem 
              id={user.id}
              name={user.name}
              location={user.location}
              avatar={user.avatar}
              trainingReady={user.trainingReady}
              typeOfTrain={user.typeOfTrain}
              request={true}
              role={user.role}
              userRole={UserRole.User}
              handleRequestClick={()=>{}}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(user.name)).toBeInTheDocument();
    expect(screen.getByText(`#${user.typeOfTrain[0]}`)).toBeInTheDocument();
    user.trainingReady ? 
      expect(screen.getByText(/Готов к тренировке/i)).toBeInTheDocument() :
      expect(screen.getByText(/Не готов к тренировке/i)).toBeInTheDocument()
    user.role === UserRole.User ?
      expect(screen.getByText(/Пригласить друга на совместную тренировку/i)).toBeInTheDocument() :
      expect(screen.queryByText(/Пригласить друга на совместную тренировку/i)).not.toBeInTheDocument();
  });
});

describe('Component: FriendRequest, role: coach', () => {
    const store = mockStore({
      user: {
          authorizationStatus: AuthorizationStatus.Auth,
          user: coach
        },
      });
  
    it('should render correctly', () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <HelmetProvider>
              <FriendsListItem 
                id={user.id}
                name={user.name}
                location={user.location}
                avatar={user.avatar}
                trainingReady={user.trainingReady}
                typeOfTrain={user.typeOfTrain}
                request={true}
                role={coach.role}
                userRole={UserRole.Coach}
                handleRequestClick={()=>{}}
              />
            </HelmetProvider>
          </HistoryRouter>
        </Provider>,
      );
  
      expect(screen.getByText(user.name)).toBeInTheDocument();
      expect(screen.getByText(`#${user.typeOfTrain[0]}`)).toBeInTheDocument();
      user.trainingReady ? 
        expect(screen.getByText(/Готов к тренировке/i)).toBeInTheDocument() :
        expect(screen.getByText(/Не готов к тренировке/i)).toBeInTheDocument();
      expect(screen.queryByText(/Пригласить друга на совместную тренировку/i)).not.toBeInTheDocument();
    });
  });
