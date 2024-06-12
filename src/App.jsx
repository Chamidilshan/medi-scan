// import { Loader } from 'lucide-react';
import './App.css'
import AppLayout from './pages/AppLayout';
import Error from './pages/Error';
import HistoryPage from './pages/HistoryPage';
import HomePage from './pages/HomePage';
import Loader from './pages/Loader';
import LoginPage from './pages/LoginPage'
import ResultPage from './pages/ResultPage';
import ScanPage from './pages/ScanPage';
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
        path: '/signUp',
        element: <SignUpPage/>
      },
      {
        path: '/home',
        element: <HomePage/>
      },
      {
        path: '/scan',
        element: <ScanPage/>
      },
      {
        path: '/result',
        element: <ResultPage/>
      },
      {
        path: '/history',
        element: <HistoryPage/>
      }
    ]
  }
])

function App() {

  return <RouterProvider router= {router}/>
}

export default App
