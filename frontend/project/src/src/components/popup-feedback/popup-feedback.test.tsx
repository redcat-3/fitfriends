import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { Provider} from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import PopupFeedback from './popup-feedback';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: PopupFeedback', () => {
  const store = mockStore({
    });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <PopupFeedback
              onClose={() => {}}
              onSendFeedback={() => {}}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Оцените тренировку/i)).toBeInTheDocument();
  });
});
