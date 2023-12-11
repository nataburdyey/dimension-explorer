import { useQuery } from 'react-query';

import './App.css';
import Graph from './components/Graph';

const dataUrl = './src/data.json';

function App() {
  const { isLoading, error, data } = useQuery('data', async () => {
    const response = await fetch(dataUrl);
    const json = await response.json();
    return json.data;
  });

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <main className='container mx-auto p-3'>
      <Graph data={data} />
    </main>
  );
}

export default App;
