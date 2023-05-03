import { FC } from 'react';
import { Stack } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

type LeaderBoardCardProps = {
  color: string;
  mt?: string | number;
};
const LeaderBoardCard: FC<LeaderBoardCardProps> = ({ color, mt }) => {
  return (
    <Stack
      sx={{
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)',
        backgroundColor: color,
        width: { xs: '20vw', sm: '10vw' },
        aspectRatio: '1/1',
        maxWidth: '350px',
        maxHeight: '350px',
        justifyContent: 'center',
        mt,
        alignItems: 'center',
        svg: {
          fontSize: '5vw',
          marginTop: '-2vw',
          color: 'white',
        },
      }}
    >
      <EmojiEventsIcon />
    </Stack>
  );
};

export default LeaderBoardCard;
