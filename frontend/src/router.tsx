import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DashboardPage } from './pages/dashboard';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}
