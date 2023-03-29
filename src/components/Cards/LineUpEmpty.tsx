import { Stack } from '@mui/material';
import React from 'react';
import { useDroppable } from '@dnd-kit/core';

function LineUpEmpty({ x, y, children, id, name }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  return (
    <Stack
      ref={setNodeRef}
      sx={{
        border: !children.props?.player && '1px solid #000',
        borderRadius: '6px',
        backgroundColor: !children.props?.player && 'rgba(0,0,0,0.2)',
        width: { xs: '13%', sm: '50px', md: '60px', lg: '70px', xl: '80px' },
        aspectRatio: '21/28',
        position: 'absolute',
        userSelect: 'none',
        top: {
          xs: `calc( ${y} * 22% + 50px)`,
          sm: `${40 + y * 90}px`,
          md: `${50 + y * 125}px`,
          lg: `${55 + y * 140}px`,
          xl: `${80 + y * 150}px`,
        },
        left: {
          xs: `calc(${x} * 24% + 5px)`,
          sm: `${5 + x * 69}px`,
          md: `${5 + x * 95}px`,
          lg: `${10 + x * 103}px`,
          xl: `${10 + x * 114}px`,
        },
        color: isOver ? 'green' : 'black',
        '#position-container': {
          position: 'relative',
        },
        '#position-fill': {
          position: 'absolute',
          left: '50%',
          top: -2,
          transform: 'translateX(-50%)',
          color: name !== children.props?.player?.name ? 'red' : 'green',
          backgroundColor: 'rgba(255,255,255,0.7)',
          boxShadow: 3,
          borderRadius: '50%',
          width: '1.5rem',
          height: '1.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '0.9rem',
        },
      }}
    >
      {children}
      {children.props?.player && (
        <span id="position-container">
          <span id="position-fill">{name}</span>
        </span>
      )}
    </Stack>
  );
}

export default LineUpEmpty;
