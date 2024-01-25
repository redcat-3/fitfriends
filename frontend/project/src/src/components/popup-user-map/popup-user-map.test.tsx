import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { Provider} from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import PopupUserMap from './popup-user-map';
import { user } from '../../mocks/users';
import { AuthorizationStatus, CITY, POINTS } from '../../constant';
import { locationToMap } from '../../utils';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: PopupUserMap', () => {
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
            <PopupUserMap
              name={user.name}
              location={user.location}
              onClose={() => {}}
              onSendLocation={() => {}}
              city={CITY}
              points={POINTS}
              selectedPoint={locationToMap(user.location)}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(user.name)).toBeInTheDocument();
  });
});
