import './App.css'
import AppLayout from './pages/AppLayout';
import Error from './pages/Error';
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    errorElement: <Error/>,
    children: [
      {
        path: '/',
        element:<LoginPage/>
      },
      {
        path: 'signUp',
        element: <SignUpPage/>
      }
    ]
  }
])

function App() {

  return <RouterProvider router= {router}/>
}

export default App
