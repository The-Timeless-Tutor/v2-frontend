import FullPageSpinner from '@/components/ui/spinner';
import { Navigate } from 'react-router-dom';

import { useAuth } from 'src/contexts/AuthContext';

const PrivateRoutes = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <FullPageSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoutes;
