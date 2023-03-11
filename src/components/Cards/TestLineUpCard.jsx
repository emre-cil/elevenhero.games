/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Box, Grid, Stack } from '@mui/material';

function TestLineUpCard({ located, player, onDoubleClick }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: player.id,
  });

  return (
    <Grid
      item
      xs={2}
      sm={2}
      md={6}
      lg={4}
      xl={6}
      onDoubleClick={onDoubleClick}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      sx={{
        transform: transform && `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        userSelect: 'none',
        img: {
          width: '100%',
        },
        position: 'relative',
        touchAction: 'none',
        zIndex: transform ? 1 : 0,
      }}
    >
      <img src={player.img} alt="player" />
      <Stack
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'grey.200',
        }}
      >
        <span>{player.id}</span>
        <span>{player.name}</span>
      </Stack>
    </Grid>
  );
}

export default TestLineUpCard;
