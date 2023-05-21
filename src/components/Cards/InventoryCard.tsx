import { FC } from 'react';
import { Button, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { useOpenBoxMutation } from '@/features/productsApiSlice';

interface InventoryCardProps {
  item: any;
  count: number;
  openHandler: any;
}

const InventoryCard: FC<InventoryCardProps> = ({ item, count, openHandler }) => {
  const [openBox, { isLoading }] = useOpenBoxMutation();

  return (
    <Grid item xs={6} sm={6} md={4} sx={{}}>
      <Stack
        sx={{
          backgroundColor: 'secondary.dark',
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
            height: 40,
          }}
          onClick={() => openHandler(item._id, openBox)}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={22} /> : 'Open'}
        </Button>
      </Stack>
    </Grid>
  );
};

export default InventoryCard;
