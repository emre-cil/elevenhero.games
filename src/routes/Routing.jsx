/* eslint-disable react/no-unstable-nested-components */
import { CircularProgress } from '@mui/material';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Profile from '../pages/Profile/Profile';
import ContentWrapper from '../layout/ContentWrapper/ContentWrapper';
import ResetPassword from '../pages/Auth/ResetPassword';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import Tournament from '../pages/Tournament/Tournament';
import Market from '../pages/Market/Market';
import Leaderboard from '../pages/Leaderboard/Leaderboard';
import Lineup from '../pages/Lineup/Lineup';
import Team from '../pages/Team/Team';
import VerifyEmail from '../pages/Auth/VerifyEmail';

function Routing({ isLoading, accessToken, hasRefresh }) {
  function ProtectedRoute() {
    return isLoading ? (
      <CircularProgress
        sx={{
          my: '10vh',
          ml: '50%',
        }}
      />
    ) : accessToken ? (
      <Outlet />
    ) : (
      <Navigate to="/login" replace />
    );
  }

  return (
    <Routes>
      <Route element={<ContentWrapper accessToken={accessToken} />}>
        <Route path="*" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/tournament" element={<Tournament />} />
          <Route path="/team" element={<Team />} />
          <Route path="/lineup" element={<Lineup />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>
        <Route path="/market" element={<Market />} />
      </Route>
      {(!hasRefresh || !accessToken) && !isLoading && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </>
      )}
    </Routes>
  );
}

export default Routing;
