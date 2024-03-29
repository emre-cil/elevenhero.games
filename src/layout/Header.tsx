import { FC } from 'react';
import { Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import BalanceCard from '@/components/Cards/BalanceCard';
// LOGO TEXT in public foler
import LOGO_TEXT from '@/assets/Images/LOGO-TEXT.webp';
import LOGO_11H from '@/assets/Images/LOGO-11H.webp';

type HeaderProps = {
  accessToken: string | null;
  setIsOpen: (p: any) => void;
};

const Header: FC<HeaderProps> = ({ accessToken, setIsOpen }) => {
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      gap={2}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 10000,
        p: {
          xs: 2,
          md: '0 20px',
        },
        width: '100%',
        height: '75px',
        alignItems: 'center',
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        '.header-img': {
          height: '60px',
          mr: {
            xs: 2,
            md: 12,
          },
          cursor: 'pointer',
        },
        // blur
        backdropFilter: 'blur(15px)',
        borderBottom: '3px solid',
        borderColor: 'text.secondary',
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
        onClick={() => setIsOpen((p: boolean) => !p)}
      />
    </Stack>
  );
};

export default Header;
