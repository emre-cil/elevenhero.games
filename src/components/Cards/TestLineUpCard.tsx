/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Grid, Stack } from '@mui/material';

type TestLineUpCardProps = {
  located?: boolean;
  player: any;
  onDoubleClick?: () => void;
};

const TestLineUpCard: React.FC<TestLineUpCardProps> = ({ player, onDoubleClick }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: player.id,
  });

  return (
    <Grid
      item
      xs={2}
      sm={4}
      md={4}
      lg={4}
      xl={4}
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
          textAlign: 'center',
          width: '100%',
          color: 'grey.200',
          fontSize: '0.8rem',
          lineHeight: '0.8rem',
        }}
      >
        <span>{player.id}</span>
        <span>{player.name}</span>
      </Stack>
    </Grid>
  );
};

export default TestLineUpCard;
