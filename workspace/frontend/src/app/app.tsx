import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { JobsPage } from '../pages/JobsPage/JobsPage';
import { WelcomePage } from '../pages/WelcomePage/WelcomePage';

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
    path: '*',
    element: <Navigate to="/" />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
