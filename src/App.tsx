import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { useAppSelector } from './app/store';
import Routing from './routes/Routing';
import { useRefreshQuery } from './features/user/userApiSlice';
import { Toaster } from 'react-hot-toast';

function App() {
  const { accessToken } = useAppSelector((state) => state.user);
  const hasRefresh = localStorage.getItem('hasRefresh');
  const { isLoading } = useRefreshQuery(hasRefresh, {
    skip: !hasRefresh || accessToken !== null,
  });
  return (
    <BrowserRouter>
      <CssBaseline />
      <Routing isLoading={isLoading} accessToken={accessToken} hasRefresh={hasRefresh} />
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          style: {
            color: '#fff',
            backgroundColor: 'transparent',
            backdropFilter: 'blur(5px)',
            fontSize: '1.2rem',
            borderRadius: '5px',
            border: '1px solid #c5d4c5',
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
