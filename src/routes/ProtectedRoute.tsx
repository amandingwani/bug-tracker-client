import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = false;
  if (!user) return <Navigate to="login" />;

  return children;
};
