import { Spin } from 'antd';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';

import { useAuth } from '../hooks';
import { LoginPage } from '../pages/auth/login';
import { ClothesPage } from '../pages/clothes';
import { DashboardPage } from '../pages/dashboard';
import { OutfitsPage } from '../pages/outfits';
import { ProfilePage } from '../pages/profile';

function ProtectedRoute() {
  const location = useLocation();
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <div className="route-loading">
        <Spin size="large" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/clothes" element={<ClothesPage />} />
          <Route path="/outfits" element={<OutfitsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
