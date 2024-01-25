import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import ScrollToTop from './scroll-to-top';

window.scrollTo = jest.fn();

describe('Component: ScrollToTop', () => {

  it('ScrollToTop renders children correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <ScrollToTop>
          <p>Hi</p>
        </ScrollToTop>
      </HistoryRouter>,
    );
    const element = screen.getByText(/Hi/);
    expect(element).toBeInTheDocument();

  });
});
