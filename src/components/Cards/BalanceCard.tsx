import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography, Box, CircularProgress } from '@mui/material';
import walletIcon from '@/assets/Icons/walletIcon.svg';
import { useGetMoneyQuery } from '@/features/user/userApiSlice';

type BalanceCardProps = {
  accessToken: string | null;
};

const BalanceCard: FC<BalanceCardProps> = ({ accessToken }) => {
  const navigate = useNavigate();
  const { data: money, isLoading } = useGetMoneyQuery(undefined);

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
          {isLoading ? (
            <CircularProgress size={16} sx={{ mx: 'auto' }} />
          ) : (
            <Typography
              variant="h6"
              sx={{
                color: 'grey.900',
                textAlign: 'center',
                width: '100%',
              }}
            >
              {money?.money}
            </Typography>
          )}
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
