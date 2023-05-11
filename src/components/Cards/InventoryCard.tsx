import { FC } from 'react';
import { Button, Grid, Stack, Typography } from '@mui/material';

interface InventoryCardProps {
  item: any;
  count: number;
}

const InventoryCard: FC<InventoryCardProps> = ({ item, count }) => {
  return (
    <Grid item xs={6} sm={6} md={4} sx={{}}>
      <Stack
        sx={{
          backgroundColor: 'grey.50',
          p: 1,
        }}
        gap={0.5}
      >
        <img src={`${import.meta.env.VITE_API_URL}/uploads/${item.image}`} alt={item.name} />

        <Typography variant="h6">{item.title}</Typography>
        <Typography>{item?.serie?.title}</Typography>
        <Typography variant="h6">{count}</Typography>
        <Button
          variant="contained"
          sx={{
            borderRadius: 0,
          }}
        >
          Open
        </Button>
      </Stack>
    </Grid>
  );
};

export default InventoryCard;
