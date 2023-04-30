import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography, Box } from '@mui/material';
import walletIcon from '@/assets/Icons/walletIcon.svg';

type BalanceCardProps = {
  accessToken: string | null;
};

const BalanceCard: FC<BalanceCardProps> = ({ accessToken }) => {
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        borderRadius: '8px',
        overflow: 'hidden',
        width: '120px',
        height: '30px',
        backgroundColor: 'Ink.Dark',
        cursor: 'pointer',
      }}
      onClick={() => navigate('/profile')}
    >
      {accessToken ? (
        <>
          <Box
            sx={{
              backgroundColor: 'Green.Base',
              height: '100%',
              width: '40px',
              p: '6px',
              img: {
                width: 20,
              },
            }}
          >
            <img src={walletIcon} alt="wallet icon" />
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: 'grey.900',
              textAlign: 'center',
              width: '100%',
            }}
          >
            0
          </Typography>
        </>
      ) : (
        <Typography
          variant="body2"
          sx={{
            color: 'grey.900',
            textAlign: 'center',
            width: '100%',
          }}
        >
          PLAY
        </Typography>
      )}
    </Stack>
  );
};

export default BalanceCard;
