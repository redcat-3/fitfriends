import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import BlockNews from './block-news';

describe('Component: BlockNews', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <BlockNews/>
      </HistoryRouter>,
    );

    const element = screen.getByText(/Скоро/i);
    expect(element).toBeInTheDocument();
  });
});
