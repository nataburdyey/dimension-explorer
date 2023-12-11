import { beforeEach, describe, expect, it } from 'vitest';
import { QueryClientProvider, QueryClient } from 'react-query';

import { AppProvider } from './context';
import App from './App';
import { render, screen } from '../test-utils';

beforeEach(() => {
  const queryClient = new QueryClient();
  render(
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AppProvider>
  );
});

// ToDo: add more tests
describe('Simple working tests', () => {
  it('renders loader when fetching data', () => {
    const loader = screen.getByText('Loading...');
    expect(loader).toBeInTheDocument();
  });

  it('renders labels for axis selection, color choice, and graph type', async () => {
    expect(await screen.findByText('Axis X:')).toBeInTheDocument();
    expect(screen.getByText('Axis Y:')).toBeInTheDocument();
    expect(screen.getByText('Color:')).toBeInTheDocument();
    expect(screen.getByText('Graph Type:')).toBeInTheDocument();
  });

  it('confirms 4 dropdown menus are available', async () => {
    const select = await screen.findAllByRole('combobox');
    expect(select).toHaveLength(4);
  });
});
