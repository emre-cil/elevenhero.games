import React from 'react';
import { Box, Stack } from '@mui/material';
import ArrowLeft from '../../assets/Icons/arrow-left.svg';
import ArrowRight from '../../assets/Icons/arrow-right.svg';

type BannerPaginationProps = {
  current: number;
  setCurrent: (current: number) => void;
  length: number;
};

const BannerPagination: React.FC<BannerPaginationProps> = ({ current, setCurrent, length }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      gap="10px"
      mt={3}
      sx={{
        img: {
          cursor: 'pointer',
        },
      }}
    >
      <img src={ArrowLeft} alt="Arrow Left" onClick={() => setCurrent(current === 0 ? length - 1 : current - 1)} />
      <Stack direction="row" alignItems="center" justifyContent="center" gap="10px">
        {Array.from({ length }, (_, i) => (
          <Box
            key={i}
            onClick={() => setCurrent(i)}
            sx={{
              backgroundColor: current === i ? 'Red.Base' : 'grey.900',
              boxShadow: (current !== i && 'Large') || 'none',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
            }}
          />
        ))}
      </Stack>
      <img src={ArrowRight} alt="Arrow Right" onClick={() => setCurrent(current === length - 1 ? 0 : current + 1)} />
    </Stack>
  );
};

export default BannerPagination;
