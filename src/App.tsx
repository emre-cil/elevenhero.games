import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { useAppSelector } from './app/store';
import Routing from './routes/Routing';
import 'react-toastify/dist/ReactToastify.css';
import { useRefreshQuery } from './features/user/userApiSlice';

function App() {
  const { accessToken } = useAppSelector((state) => state.user);
  const hasRefresh = localStorage.getItem('hasRefresh');
  const { isLoading } = useRefreshQuery(hasRefresh, { skip: !hasRefresh || accessToken });
  return (
    <BrowserRouter>
      <CssBaseline />
      <Routing isLoading={isLoading} accessToken={accessToken} hasRefresh={hasRefresh} />
    </BrowserRouter>
  );
}

export default App;
