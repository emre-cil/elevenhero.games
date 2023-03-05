/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Box } from '@mui/material';

function TestLineUpCard({ located, img, id, onDoubleClick }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
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
        touchAction: 'none',
      }}
    >
      <img src={img} alt="player" />
      {id}
    </Box>
  );
}

export default TestLineUpCard;
