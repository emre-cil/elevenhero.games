import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

function ContentWrapper({ accessToken }) {
  const [isOpen, setIsOpen] = useState(!(window.innerWidth < 900));
  return (
    <>
      <Header accessToken={accessToken} setIsOpen={setIsOpen} />
      <Stack direction="row">
        <Sidebar accessToken={accessToken} isOpen={isOpen} setIsOpen={setIsOpen} />
        <Box
          sx={{
            mt: '100px',
            ml: { xs: 0, md: '200px' },
            width: '100%',
          }}
        >
          <Outlet />
        </Box>
      </Stack>
      <Footer />
    </>
  );
}

export default ContentWrapper;
