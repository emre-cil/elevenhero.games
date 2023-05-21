import { Stack } from '@mui/material';
import Loading from './Loading';

const ProtectedLoading = () => {
  return (
    <Stack
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
      }}
    >
      <Loading loading={true} />
    </Stack>
  );
};

export default ProtectedLoading;
