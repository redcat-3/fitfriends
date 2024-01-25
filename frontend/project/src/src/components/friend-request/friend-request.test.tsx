import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import FriendRequest from './friend-request';
import { AuthorizationStatus } from '../../constant';
import { coach, user } from '../../mocks/users';


const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: FriendRequest, role: user', () => {
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
            <FriendRequest 
              role={user.role}
              handleRequestAcceptClick={()=>{}}
              handleRequestRejectedClick={()=>{}}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Запрос на совместную тренировку/i)).toBeInTheDocument();
    expect(screen.getByText(/Принять/i)).toBeInTheDocument();
    expect(screen.getByText(/Отклонить/i)).toBeInTheDocument();
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
              <FriendRequest 
                role={coach.role}
                handleRequestAcceptClick={()=>{}}
                handleRequestRejectedClick={()=>{}}
              />
            </HelmetProvider>
          </HistoryRouter>
        </Provider>,
      );
  
      expect(screen.getByText(/Запрос на персональную тренировку/i)).toBeInTheDocument();
      expect(screen.getByText(/Принять/i)).toBeInTheDocument();
      expect(screen.getByText(/Отклонить/i)).toBeInTheDocument();
    });
  });
