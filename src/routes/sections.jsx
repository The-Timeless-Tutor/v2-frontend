import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Web3Page from 'src/pages/web3';
import RoomsPage from 'src/pages/room';
import DashboardLayout from 'src/layouts/dashboard';

import PrivateRoutes from './private-routes';



export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const RegisterPage = lazy(() => import('src/pages/register'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const OAuthCallback = lazy(() => import('src/sections/login/oauth-callback'));
export const WOAuthCallback = lazy(() => import('src/sections/login/worldcoin-oauth-callback'));

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <PrivateRoutes>
            <Suspense>
              <Outlet />
            </Suspense>
          </PrivateRoutes>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'rooms', element: <RoomsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'web3', element: <Web3Page /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: 'oauth-callback', // Define the OAuth callback route
      element: <OAuthCallback />,
    },
    {
      path: 'worldcoin-oauth-callback', // Define the OAuth callback route
      element: <WOAuthCallback />,
    },
  ]);

  return routes;
}
