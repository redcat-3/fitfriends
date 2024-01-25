import {fireEvent, getByLabelText, getByTitle, render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../../history-router/history-router';
import Notification from './notification';
import { AuthorizationStatus } from '../../../../constant';
import { user } from '../../../../mocks/users';
import { notifications } from '../../../../mocks/notifications';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Notification', () => {
  const store = mockStore({
    user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user
      },
    reaction: {
        notifications,
    }
    });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Notification 
              notificationId={notifications[0].notificationId}
              text={notifications[0].text}
              createdDate={notifications[0].createdDate}
              isNotificationActive={notifications[0].isActive}
              OnNotificationClick={(id: number) => {}}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(notifications[0].text)).toBeInTheDocument();
  });
});
