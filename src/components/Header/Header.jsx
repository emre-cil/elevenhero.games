import React from 'react';
import { Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import BalanceCard from '../Cards/BalanceCard';
// LOGO TEXT in public foler
import LOGO_TEXT from '../../assets/Images/LOGO-TEXT.webp';
import LOGO_11H from '../../assets/Images/LOGO-11H.webp';

function Header({ accessToken, setIsOpen }) {
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      gap={2}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000221,
        p: {
          xs: 3,
          md: '24px 20px',
        },
        width: '100%',
        height: '100px',
        alignItems: 'center',
        backgroundColor: 'Ink.Darkest',
        justifyContent: 'space-between',
        '.header-img': {
          height: '60px',
          mr: {
            xs: 2,
            md: 12,
          },
          cursor: 'pointer',
        },
        borderBottom: '3px solid',
        borderColor: 'Green.Base',
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px',
      }}
    >
      <img
        className="header-img"
        src={window.innerWidth > 600 ? LOGO_TEXT : LOGO_11H}
        alt="logo"
        onClick={() => navigate('/')}
      />
      <BalanceCard accessToken={accessToken} />
      <MenuIcon
        sx={{
          display: { xs: 'block', md: 'none' },
          color: 'white',
          fontSize: '45px',
          ml: 'auto',
        }}
        onClick={() => setIsOpen((p) => !p)}
      />
    </Stack>
  );
}

export default Header;
