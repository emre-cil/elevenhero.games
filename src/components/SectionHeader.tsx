import { Typography } from '@mui/material';
import { FC } from 'react';

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: FC<SectionHeaderProps> = ({ title }) => {
  return (
    <Typography
      variant="h3"
      textAlign="center"
      sx={{
        boxShadow: 4,
        p: 1,
        background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(61, 117, 65, 0.5) 50%, rgba(0,0,0,0) 100%)',
      }}
    >
      {title}
    </Typography>
  );
};

export default SectionHeader;
