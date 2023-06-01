import { Stack, Typography } from '@mui/material';
import { FC } from 'react';

interface TextBadgeCardProps {
  title: string;
  text: string;
}

const TextBadgeCard: FC<TextBadgeCardProps> = ({ title, text }) => {
  return (
    <Stack
      sx={{
        p: 0.75,
        borderRadius: '5px',
        backgroundColor: 'Ink.Light',
        boxShadow: 2,
        width: '100%',
      }}
      gap={0.25}
    >
      <Typography variant="h6" sx={{ color: 'grey.700', fontSize: '14px!important', lineHeight: '10px' }}>
        {title}
      </Typography>
      <Typography variant="h6" sx={{ color: 'grey.900', textAlign: 'center' }}>
        {text}
      </Typography>
    </Stack>
  );
};

export default TextBadgeCard;
