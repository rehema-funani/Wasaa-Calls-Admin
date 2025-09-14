// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { CallsProvider } from './context/CallsContext'
import Layout from './components/layout/Layout'
import Dashboard from './app/dashboard/Dashboard'
import CallsMonitoring from './app/calls/CallsMonitoring'
import UsersRoles from './app/users/UsersRoles'
import BillingWallet from './app/billing/BillingWallet'
import ModerationCompliance from './app/moderation/ModerationCompliance'
import ReportsAnalytics from './app/reports/ReportsAnalytics'
import SettingsIntegrations from './app/settings/SettingsIntegrations'
import LoginPage from './app/auth/LoginPage'
// import { useAuth } from './hooks/useAuth'
// import './App.css'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // The authentication logic is temporarily disabled.
  // The line below is commented out to avoid "unused variables" errors.
  // const { isAuthenticated, isLoading } = useAuth()
  
  // NOTE: Temporarily disabled for frontend development without a running API.
  // This will allow access to all routes without authentication.
  // TODO: Re-enable this when the backend API is available.
  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
  //     </div>
  //   )
  // }
  // return isAuthenticated ? <>{children}</> : <Navigate to="/auth/login" replace />
  return <>{children}</>;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <CallsProvider>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/calls/*" element={<CallsMonitoring />} />
                      <Route path="/users/*" element={<UsersRoles />} />
                      <Route path="/billing/*" element={<BillingWallet />} />
                      <Route path="/moderation/*" element={<ModerationCompliance />} />
                      <Route path="/reports/*" element={<ReportsAnalytics />} />
                      <Route path="/settings/*" element={<SettingsIntegrations />} />
                    </Routes>
                  </Layout>
                </CallsProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--background)',
              color: 'var(--foreground)',
              border: '1px solid var(--border)',
            },
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App