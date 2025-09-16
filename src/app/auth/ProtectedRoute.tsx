// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// // import { useAuthContext } from '../../context/AuthContext';
// import { useAuth } from '../../context/AuthContext';

// const LoadingFallback = () => (
//   <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
//     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
//   </div>
// );

// export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { isAuthenticated, isLoading } = useAuth();
//   const location = useLocation();

//   if (isLoading) {
//     return <LoadingFallback />;
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/auth/login" state={{ from: location }} replace />;
//   }

//   return <>{children}</>;
// };