import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { useAppSelector } from './app/store';
import Routing from './routes/Routing';
import { useRefreshQuery } from './features/user/userApiSlice';
import { Toaster } from 'react-hot-toast';

function App() {
  const { accessToken } = useAppSelector((state) => state.user);
  const hasRefresh = localStorage.getItem('hasRefresh');
  const { isLoading } = useRefreshQuery(hasRefresh, { skip: !hasRefresh || accessToken });
  return (
    <BrowserRouter>
      <CssBaseline />
      <Routing isLoading={isLoading} accessToken={accessToken} hasRefresh={hasRefresh} />
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'linear-gradient(#003d3a, #006661)',
            color: '#fff',
            fontSize: '1.2rem',
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
