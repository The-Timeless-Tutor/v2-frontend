import { Navigate } from 'react-router-dom';

import { useAuth } from 'src/contexts/AuthContext';

const PrivateRoutes = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // TODO: add loading indicator
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoutes;
