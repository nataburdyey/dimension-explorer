import { useQuery } from 'react-query'
import './App.css'

import Graph from "./components/Graph";

function App() {
  const { isLoading, error, data } = useQuery('data', () =>
    import('./data.json').then(res => res.data)
  )
  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <main className="container mx-auto p-3">
      <Graph data={data} />
    </main>
  )
}

export default App
