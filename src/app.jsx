/* eslint-disable perfectionist/sort-imports */

import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { AuthProvider } from './contexts/AuthContext';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router />
        <ToastContainer
          position="top-center"
          autoClose={2500}
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
      </AuthProvider>
    </ThemeProvider>
  );
}
