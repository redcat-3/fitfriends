import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import BackgroundLogo from './background-logo';

describe('Component: BackgroundLogo', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <BackgroundLogo/>
      </HistoryRouter>,
    );

    const element = screen.getByTitle('background-logo');

    expect(element).toBeInTheDocument();
  });
});
