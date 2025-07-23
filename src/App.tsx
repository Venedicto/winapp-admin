import { Routes, Route, Navigate } from 'react-router-dom'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import { Toaster } from 'sonner'
import LoginForm from './components/forms/LoginForm'
import DashboardLayout from './components/layout/DashboardLayout'
import Dashboard from './pages/Dashboard'
import BusinessList from './pages/BusinessList'
import BusinessDetail from './pages/BusinessDetail'
import UserList from './pages/UserList'
import BusinessCategoriesList from './pages/BusinessCategoriesList'
import ProductCategoriesList from './pages/ProductCategoriesList'
import PointsConfig from './pages/PointsConfig'
import NotificationsList from './pages/NotificationsList'

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route 
          path="/login" 
          element={
            <SignedOut>
              <LoginForm />
            </SignedOut>
          } 
        />
        
        {/* Protected routes */}
        <Route 
          path="/dashboard/*" 
          element={
            <SignedIn>
              <DashboardLayout>
                <Routes>
                  <Route index element={<Dashboard />} />
                  <Route path="comercios" element={<BusinessList />} />
                  <Route path="comercios/:id" element={<BusinessDetail />} />
                  <Route path="comercios-pendientes" element={<div>Comercios Pendientes</div>} />
                  <Route path="usuarios" element={<UserList/>} />
                  <Route path="categorias" element={<Navigate to="categorias/negocios" replace />} />
                  <Route path="categorias/negocios" element={<BusinessCategoriesList />} />
                  <Route path="categorias/productos" element={<ProductCategoriesList />} />
                  <Route path="puntos" element={<PointsConfig />} />
                  <Route path="estadisticas" element={<div>Estadísticas</div>} />
                  <Route path="notificaciones" element={<NotificationsList />} />
                  <Route path="configuracion" element={<div>Configuración</div>} />
                </Routes>
              </DashboardLayout>
            </SignedIn>
          } 
        />
        
        {/* Default redirects */}
        <Route 
          path="/" 
          element={
            <>
              <SignedIn>
                <Navigate to="/dashboard" replace />
              </SignedIn>
              <SignedOut>
                <Navigate to="/login" replace />
              </SignedOut>
            </>
          } 
        />
      </Routes>
      <Toaster position="top-right" />
    </>
  )
}

export default App
