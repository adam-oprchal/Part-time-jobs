import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { JobsPage } from '../pages/JobsPage/JobsPage';
import { WelcomePage } from '../pages/WelcomePage/WelcomePage';
import { LoginPage } from '../pages/FormPages/LoginPage';
import { RegisterPage } from '../pages/FormPages/RegisterPage';
import { AccountPage } from '../pages/AccountPage/AccountPage';
import { CreatePostPage } from '../pages/FormPages/CreatePostPage';

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
    path: '/account',
    Component: AccountPage,
  },
  {
    path: '/create',
    Component: CreatePostPage,
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
