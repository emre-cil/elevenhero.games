import { ToastContainer } from 'react-toastify';
import { Stack, Typography } from '@mui/material';
import { FormSX } from './Auth.styles';

function AuthOutlet({ children, header }) {
  return (
    <form>
      <Stack gap={3} sx={FormSX}>
        {header ? (
          <Typography textAlign="center" variant="h4">
            {header}
          </Typography>
        ) : (
          // <img src={theme.palette.mode === 'dark' ? GumrukAppLogoWhite : GumrukAppLogo} alt="logo" />
          <></>
        )}
        {children}
      </Stack>
      <ToastContainer
        draggable
        closeOnClick
        theme="colored"
        autoClose={3500}
        pauseOnHover={false}
        position="bottom-left"
      />
    </form>
  );
}

export default AuthOutlet;
