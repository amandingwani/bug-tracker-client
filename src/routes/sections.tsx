import { lazy, Suspense, ReactNode } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import { useAppSelector } from 'src/redux/hooks';
import { selectUser } from 'src/redux/slices/authSlice';
import { UserState } from 'src/redux/types';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const ProjectsPage = lazy(() => import('src/pages/projects'));
export const ProjectDetailsPage = lazy(() => import('src/pages/projectDetails'));
export const TicketsPage = lazy(() => import('src/pages/tickets'));
export const TicketDetailsPage = lazy(() => import('src/pages/ticketDetails'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router(): ReactNode {
  const user = useAppSelector(selectUser);
  let isLoggedIn: boolean;
  if (!user) {
    const localStorageUserString = localStorage.getItem('BUG_NINJA_USER');
    const localStorageUser: UserState | null = localStorageUserString
      ? JSON.parse(localStorageUserString)
      : null;

    isLoggedIn = !!localStorageUser;
  } else {
    isLoggedIn = !!user;
  }

  const routes = useRoutes([
    {
      element: isLoggedIn ? (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ) : (
        <Navigate to="login" replace />
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'projects', element: <ProjectsPage /> },
        { path: 'projects/:projectId', element: <ProjectDetailsPage /> },
        { path: 'projects/:projectId/tickets/:ticketId', element: <TicketDetailsPage /> },
        { path: 'tickets', element: <TicketsPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: !isLoggedIn ? <LoginPage /> : <Navigate to="/" replace />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
