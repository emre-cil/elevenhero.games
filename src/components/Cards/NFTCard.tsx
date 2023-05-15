import { FC } from 'react';
import { Grid, Stack, Typography } from '@mui/material';

interface NFTCardProps {
  item: any;
}

const NFTCard: FC<NFTCardProps> = ({ item }) => {
  return (
    <Grid item xs={6} sm={6} md={4} sx={{}}>
      <Stack
        sx={{
          img: {
            webkitFilter: 'drop-shadow(5px 5px 5px #222)',
            filter: 'drop-shadow(5px 5px 15px #222)',
          },
        }}
        gap={0.5}
      >
        <img src={`${import.meta.env.VITE_API_URL}/nfts/${item.image}.webp`} alt={item.name} />

        <Typography variant="h6">{item.title}</Typography>
        <Typography>{item?.serie?.title}</Typography>
      </Stack>
    </Grid>
  );
};

export default NFTCard;
