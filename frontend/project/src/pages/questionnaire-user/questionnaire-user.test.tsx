import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { Provider} from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-router/history-router';
import QuestionnaireUser from './questionnaire-user';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: QuestionnaireUser', () => {
  const store = mockStore({
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <QuestionnaireUser/>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Ваша специализация/i)).toBeInTheDocument();
  });
});