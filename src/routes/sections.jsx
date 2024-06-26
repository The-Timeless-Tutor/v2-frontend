import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Web3Page from 'src/pages/web3';
import RoomsPage from 'src/pages/room';
import DashboardLayout from 'src/layouts/dashboard';

import PrivateRoutes from './private-routes';
import FullPageSpinner from '@/components/ui/spinner';
import SystemDownMessage from '@/components/ui/system-down';
import ChatRoomDataProvider from '@/contexts/ChatRoomsContext';

// Import pages dynamically when needed, to reduce the initial loading time
export const OAuthCallback = lazy(() => import('@/sections/login/oauth-callback'));
export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const ChatPage = lazy(() => import('src/pages/chat'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const RegisterPage = lazy(() => import('src/pages/register'));
export const ForgotPasswordPage = lazy(() => import('src/pages/forgot-password'));
export const ResetPasswordPage = lazy(() => import('src/pages/reset-password'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const AssessmentPage = lazy(() => import('src/pages/assessment'));
export const CreateRoom = lazy(() => import('src/pages/create-rooms'));

export const LandingHome = lazy(() => import('src/pages/landing-home'));

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <PrivateRoutes>
            <Suspense fallback={<FullPageSpinner />}>
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
        { path: 'assessment/:slug', element: <AssessmentPage /> },
        { path: 'create-room', element: <CreateRoom /> },
        {
          path: 'chat',
          element: (
            <ChatRoomDataProvider>
              <ChatPage />
            </ChatRoomDataProvider>
          )
        },
        { path: 'web3', element: <Web3Page /> }
      ]
    },
    {
      path: '/home',
      element: <LandingHome />
    },
    {
      path: 'login',
      element: <LoginPage />
    },
    {
      path: 'register',
      element: <RegisterPage />
    },
    {
      path: 'forgot-password',
      element: <ForgotPasswordPage />
    },
    {
      path: 'reset-password',
      element: <ResetPasswordPage />
    },
    {
      path: 'oauth-callback',
      element: <OAuthCallback />
    },
    {
      path: '404',
      element: <Page404 />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    },
    {
      path: 'system-down',
      element: <SystemDownMessage />
    }
  ]);

  return routes;
}
