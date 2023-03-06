import { Stack } from '@mui/material';
import React from 'react';

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
        backgroundColor: 'Ink.Darkest',
        color: 'Sky.White',
        fontSize: '14px',
        fontWeight: 'bold',
        letterSpacing: '0.5px',
        lineHeight: '16px',
        textAlign: 'center',
        borderTop: '3px solid',
        borderColor: 'Green.Base',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
      }}
    >
      <p>© 2023 - All rights reserved</p>
    </Stack>
  );
}

export default Footer;