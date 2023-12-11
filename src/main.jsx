import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

import { AppProvider } from './context';

import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </AppProvider>
);
