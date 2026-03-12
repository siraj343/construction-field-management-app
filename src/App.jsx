import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import ProjectListPage from './pages/ProjectListPage'
import DPRFormPage from './pages/DPRFormPage'

// Simple auth context via prop drilling (great for beginners)
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated
            ? <Navigate to="/projects" replace />
            : <LoginPage onLogin={() => setIsAuthenticated(true)} />
        }
      />
      <Route
        path="/projects"
        element={
          isAuthenticated
            ? <ProjectListPage onLogout={() => setIsAuthenticated(false)} />
            : <Navigate to="/" replace />
        }
      />
      <Route
        path="/dpr/:projectId"
        element={
          isAuthenticated
            ? <DPRFormPage />
            : <Navigate to="/" replace />
        }
      />
      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
