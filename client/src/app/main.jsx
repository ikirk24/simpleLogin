import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './routes/App.jsx'
import Login from './routes/login.jsx'
import Signup from './routes/signup.jsx'
import Users from './routes/Users.jsx';
import UpdateProfile from './routes/UpdateProfile.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
  {path: '/', element: <Login />},
  {path: '/signup', element: <Signup /> },
  {path: '/profile', element: <App />},
  {path: '/users', element: <Users />},
  {path:'/update', element: <UpdateProfile/>}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
