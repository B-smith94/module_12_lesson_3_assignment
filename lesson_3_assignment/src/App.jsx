import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ViewPosts from './componenets/ViewPosts';
import CreatePost from './componenets/CreatePost';
import UpdatePostMutation from './componenets/UpdatePost';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  const queryClient = new QueryClient();


  
  return (
    <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/' element={<ViewPosts />} />
          <Route path='/new-post' element={<CreatePost />} />
          <Route path='/update-post/' element={<UpdatePostMutation post={post[0]} />} />
        </Routes>
    </QueryClientProvider>
  )
}

export default App
