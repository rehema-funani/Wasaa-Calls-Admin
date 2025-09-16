import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
// import LoginPage from './app/auth/LoginPage';
import Page from './app/auth/login/page';

// import { ProtectedRoute } from './app/auth/ProtectedRoute';
// Lazily load the page components
const Dashboard = React.lazy(() => import('./app/dashboard/Dashboard'));
const UsersRoles = React.lazy(() => import('./app/users/UsersRoles'));
const CallsMonitoring = React.lazy(() => import('./app/calls/CallsMonitoring'));
const BillingWallet = React.lazy(() => import('./app/billing/BillingWallet'));
const ModerationCompliance = React.lazy(() => import('./app/moderation/ModerationCompliance'));
const ReportsAnalytics = React.lazy(() => import('./app/reports/ReportsAnalytics'));
const SettingsIntegrations = React.lazy(() => import('./app/settings/SettingsIntegrations'));

const LoadingFallback = () => (
  <div className="p-8 h-full flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/login" element={<Page />} />
      <Route
        path="/*"
        element={
          // <ProtectedRoute>
            <Layout>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/users/*" element={<UsersRoles />} />
                  <Route path="/calls/*" element={<CallsMonitoring />} />
                  <Route path="/billing/*" element={<BillingWallet />} />
                  <Route path="/moderation/*" element={<ModerationCompliance />} />
                  <Route path="/reports/*" element={<ReportsAnalytics />} />
                  <Route path="/settings/*" element={<SettingsIntegrations />} />
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </Suspense>
            </Layout>
          // </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;