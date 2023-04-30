import { useState, FC } from 'react';
import { Box, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import Sidebar from '@/layout/Sidebar';

type ContentWrapperProps = {
  accessToken: string | null;
};
const ContentWrapper: FC<ContentWrapperProps> = ({ accessToken }) => {
  const [isOpen, setIsOpen] = useState(!(window.innerWidth < 900));
  return (
    <>
      <Header accessToken={accessToken} setIsOpen={setIsOpen} />
      <Stack direction="row">
        <Sidebar accessToken={accessToken} isOpen={isOpen} setIsOpen={setIsOpen} />
        <Box
          sx={{
            mt: '75px',
            ml: { xs: 0, md: '200px' },
            width: '100%',
            minHeight: 'calc(100vh - 75px)',
          }}
        >
          <Outlet />
        </Box>
      </Stack>
      <Footer />
    </>
  );
};

export default ContentWrapper;
