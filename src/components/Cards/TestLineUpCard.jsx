/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Box } from '@mui/material';

function TestLineUpCard({ located, player, onDoubleClick }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: player.id,
  });

  return (
    <Box
      onDoubleClick={onDoubleClick}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      sx={{
        transform: transform && `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        width: located ? '100%' : { xs: '50px', sm: '120px', md: '150px', lg: '180px', xl: '120px' },
        height: '100%',
        userSelect: 'none',
        img: {
          width: '100%',
        },
        position: 'relative',
        touchAction: 'none',
        zIndex: transform ? 1 : 0,
        span: {
          position: 'absolute',
          bottom: '30%',
          left: 0,
          right: 0,
          width: '100%',
          color: 'black',
          textAlign: 'center',
          fontSize: { xs: '10px', sm: '12px' },
        },
        '#p-name': {
          bottom: '15%',
        },
      }}
    >
      <img src={player.img} alt="player" />
      <span>{player.id}</span>
      <span id="p-name">{player.name}</span>
    </Box>
  );
}

export default TestLineUpCard;
