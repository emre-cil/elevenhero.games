import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Auth/Login';
import Register from '@/pages/Auth/Register';
import Profile from '@/pages/Profile/Profile';
import ContentWrapper from '@/layout/ContentWrapper';
import ResetPassword from '@/pages/Auth/ResetPassword';
import ForgotPassword from '@/pages/Auth/ForgotPassword';
import Tournament from '@/pages/Tournament/Tournament';
import Market from '@/pages/Market/Market';
import Leaderboard from '@/pages/Leaderboard/Leaderboard';
import Lineup from '@/pages/Lineup/Lineup';
import VerifyEmail from '@/pages/Auth/VerifyEmail';
import Inventory from '@/pages/Inventory';
import ProtectedLoading from '@/components/ProtectedLoading';

function Routing({ isLoading, accessToken, hasRefresh }: any) {
  function ProtectedRoute() {
    return isLoading ? <ProtectedLoading /> : accessToken ? <Outlet /> : <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route element={<ContentWrapper accessToken={accessToken} loading={isLoading} />}>
        <Route element={<ProtectedRoute />}>
          <Route path="*" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tournament" element={<Tournament />} />
          <Route path="/lineup" element={<Lineup />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/market" element={<Market />} />
          <Route path="/inventory" element={<Inventory />} />
        </Route>
      </Route>
      {(!hasRefresh || !accessToken) && !isLoading && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </>
      )}
      {!hasRefresh && <Route path="/verify-email" element={<VerifyEmail />} />}
    </Routes>
  );
}

export default Routing;
