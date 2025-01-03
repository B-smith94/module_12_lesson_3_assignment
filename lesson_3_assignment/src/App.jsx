import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ViewPosts from './componenets/ViewPosts';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <ViewPosts />
    </QueryClientProvider>
  )
}

export default App
