import { Stack, Typography } from '@mui/material';
import { FC } from 'react';

interface TextBadgeCardProps {
  title: string;
  text: string;
  onClick?: any;
}

const TextBadgeCard: FC<TextBadgeCardProps> = ({ title, text, onClick }) => {
  return (
    <Stack
      sx={{
        p: 0.75,
        borderRadius: '5px',
        backgroundColor: 'Ink.Light',
        boxShadow: 2,
        width: '100%',
      }}
      onClick={onClick}
      gap={0.25}
    >
      <Typography variant="h6" sx={{ color: 'grey.700', fontSize: '14px!important', lineHeight: '10px' }}>
        {title}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: 'grey.900',
          textAlign: 'center',
          // wrap
          wordBreak: 'break-all',
        }}
      >
        {text}
      </Typography>
    </Stack>
  );
};

export default TextBadgeCard;
