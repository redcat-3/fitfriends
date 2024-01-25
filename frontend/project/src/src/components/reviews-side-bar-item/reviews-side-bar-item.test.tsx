import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { Provider} from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import ReviewsSideBarItem from './reviews-side-bar-item';
import { user } from '../../mocks/users';
import { AuthorizationStatus, CITY, POINTS } from '../../constant';
import { locationToMap } from '../../utils';
import { generateFeedback } from '../../mocks/feedbacks';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const feedback = generateFeedback(1, 1);

describe('Component: ReviewsSideBarItem', () => {
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
            <ReviewsSideBarItem
              feedback={feedback}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(feedback.name)).toBeInTheDocument();
  });
});
