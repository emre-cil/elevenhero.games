import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography, Box } from '@mui/material';
import walletIcon from '../../assets/Icons/walletIcon.svg';

function BalanceCard({ accessToken }) {
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        borderRadius: '8px',
        overflow: 'hidden',
        width: '179px',
        height: '48px',
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
              width: '48px',
              p: '12px 10px',
            }}
          >
            <img src={walletIcon} alt="wallet icon" />
          </Box>
          <Typography
            variant="Title3"
            sx={{
              color: 'Sky.White',
              textAlign: 'center',
              width: '100%',
            }}
          >
            0
          </Typography>
        </>
      ) : (
        <Typography
          variant="Title3"
          sx={{
            color: 'Sky.White',
            textAlign: 'center',
            width: '100%',
          }}
        >
          PLAY
        </Typography>
      )}
    </Stack>
  );
}

export default BalanceCard;
