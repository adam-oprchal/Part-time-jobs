import { Navigate, RouteObject } from "react-router-dom"
// import { WelcomePage } from "../pages/WelcomePage/WelcomePage";
import { JobsPage } from "../pages/JobsPage/JobsPage";
import { LoginPage } from "../pages/FormPages/LoginPage";
import { RegisterPage } from "../pages/FormPages/RegisterPage";
import { AccountPage } from "../pages/AccountPage/AccountPage";
import { CreatePostPage } from "../pages/FormPages/CreatePostPage";
import { MainLayout } from "../layouts/MainLayout";

const pageRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="/jobs" relative="path" />,
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
    path: '/jobs',
    Component: JobsPage,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
];

const routes: RouteObject[] = [
  {
    path: '/',
    Component: MainLayout,
    children: pageRoutes
  },
  {
    path: '*',
    element: <Navigate to="/" relative="path" />,
  }
]

export default routes