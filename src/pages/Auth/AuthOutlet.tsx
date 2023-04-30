import { Stack, Typography } from '@mui/material';
import { FormSX } from './Auth.styles';

function AuthOutlet({ children, header }: any) {
  return (
    <form>
      <Stack gap={3} sx={FormSX}>
        {header && (
          <Typography textAlign="center" variant="h4">
            {header}
          </Typography>
        )}
        {children}
      </Stack>
    </form>
  );
}

export default AuthOutlet;
