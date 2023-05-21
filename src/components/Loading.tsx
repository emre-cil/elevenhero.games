import { FC } from 'react';
import ball from '@/assets/Images/football.webp';
import { Stack } from '@mui/material';

interface LoadingProps {
  loading: boolean;
}

const Loading: FC<LoadingProps> = ({ loading }) => {
  return loading ? (
    <Stack
      sx={{
        width: '100%',
        height: '100%',
        img: {
          width: '80px',
          height: '80px',
          animation: 'spin 3s linear infinite',
          '@keyframes spin': {
            '0%': {
              transform: 'rotate(0deg)',
            },
            '50%': {
              transform: 'rotate(720deg)',
            },
            '100%': {
              transform: 'rotate(0deg)',
            },
          },
        },
        // left to right and return to left animation
        animation: 'move 3s linear infinite',
        '@keyframes move': {
          '0%': {
            transform: 'translateX(0%)',
          },
          '50%': {
            transform: 'translateX(calc(100% - 80px))',
          },
          '100%': {
            transform: 'translateX(0%)',
          },
        },
      }}
      justifyContent="center"
    >
      <img src={ball} alt="loading" />
    </Stack>
  ) : null;
};

export default Loading;
