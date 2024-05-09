import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
import FullPageSpinner from './components/ui/spinner';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ui/error-fallback';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.replace('/')}>
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<FullPageSpinner />}>
          <App />
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </ErrorBoundary>
);
