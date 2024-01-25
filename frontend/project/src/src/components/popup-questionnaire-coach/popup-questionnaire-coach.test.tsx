import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { Provider} from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import PopupQuestionnaireCoach from './popup-questionnaire-coach';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: PopupQuestionnaireCoach', () => {
  const store = mockStore({
    });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <PopupQuestionnaireCoach/>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Опросник/i)).toBeInTheDocument();
  });
});
