import { Stack } from '@mui/material';
import React from 'react';
import { useDroppable } from '@dnd-kit/core';

function LineUpEmpty({ x, y, children, id }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <Stack
      ref={setNodeRef}
      sx={{
        border: '1px solid #000',
        borderRadius: '6px',
        backgroundColor: 'rgba(0,0,0,0.2)',
        width: { xs: '13%', sm: '50px', md: '70px', lg: '80px', xl: '90px' },
        aspectRatio: '21/28',
        position: 'absolute',
        userSelect: 'none',
        top: {
          xs: `calc( ${y} * 20% + 30px)`,
          sm: `${35 + y * 80}px`,
          md: `${40 + y * 98}px`,
          lg: `${45 + y * 120}px`,
          xl: `${60 + y * 140}px`,
        },
        left: {
          xs: `calc(${x} * 24.75%)`,
          sm: `${20 + x * 89}px`,
          md: `${21 + x * 111}px`,
          lg: `${22 + x * 136}px`,
          xl: `${25 + x * 160}px`,
        },
        color: isOver ? 'green' : 'black',
      }}
    >
      {children}
    </Stack>
  );
}

export default LineUpEmpty;
