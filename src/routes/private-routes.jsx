import { Navigate } from 'react-router-dom';

import { useAuth } from 'src/contexts/AuthContext';

const PrivateRoutes = ({ children }) => {
  const { isAuthenticated } = useAuth();
  console.log(' isAuthenticated: ', isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoutes;
