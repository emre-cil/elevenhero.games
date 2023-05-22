/* eslint-disable react/jsx-props-no-spreading */
import { useDraggable } from '@dnd-kit/core';
import { Grid, Stack } from '@mui/material';
import { FC } from 'react';

type TestLineUpCardProps = {
  located?: boolean;
  player: any;
  onDoubleClick?: () => void;
};

const TestLineUpCard: FC<TestLineUpCardProps> = ({ player, onDoubleClick }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: player._id,
  });

  return (
    <Grid
      item
      xs={2}
      sm={4}
      md={4}
      lg={6}
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
      <img src={`${import.meta.env.VITE_API_URL}/nfts/${player.image}.webp`} alt="player" />
    </Grid>
  );
};

export default TestLineUpCard;
