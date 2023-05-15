import { Stack } from '@mui/material';

function Footer() {
  return (
    <Stack
      direction="row"
      sx={{
        mt: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '120px',
        backgroundColor: 'black',
        color: 'grey.900',
        fontSize: '14px',
        fontWeight: 'bold',
        letterSpacing: '0.5px',
        lineHeight: '16px',
        textAlign: 'center',
        borderTop: '3px solid',
        borderColor: 'text.secondary',
      }}
    >
      <p>© 2023 - All rights reserved</p>
    </Stack>
  );
}

export default Footer;
