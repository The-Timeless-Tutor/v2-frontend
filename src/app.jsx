/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';

// ----------------------------------------------------------------------

const queryClient = new QueryClient();

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
