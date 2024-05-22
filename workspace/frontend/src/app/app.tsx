import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { JobsPage } from '../pages/JobsPage/JobsPage';
import { WelcomePage } from '../pages/WelcomePage/WelcomePage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage';

const router = createBrowserRouter([
  {
    path: '/',
    Component: WelcomePage,
  },
  {
    path: '/jobs',
    Component: JobsPage,
  },
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/register',
    Component: RegisterPage,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
