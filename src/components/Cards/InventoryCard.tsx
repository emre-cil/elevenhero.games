import { FC } from 'react';
import { Button, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { useOpenBoxMutation } from '@/features/productsApiSlice';
import { toast } from 'react-hot-toast';

interface InventoryCardProps {
  item: any;
  count: number;
  prodId: string;
}

const InventoryCard: FC<InventoryCardProps> = ({ item, count, prodId }) => {
  const [openBox, { isLoading }] = useOpenBoxMutation();
  console.log(item);
  const openHandler = () => {
    openBox({ boxId: item._id, prodId: prodId })
      .then((res) => {
        toast.success('Box opened');
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Error opening box');
      });
  };
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
          onClick={openHandler}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={22} /> : 'Open'}
        </Button>
      </Stack>
    </Grid>
  );
};

export default InventoryCard;
