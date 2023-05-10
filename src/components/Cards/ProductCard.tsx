import { FC } from 'react';
import { Button, Grid, Stack, Typography } from '@mui/material';

interface ProductCardProps {
  item: any;
  setBuyItem: any;
}

const ProductCard: FC<ProductCardProps> = ({ item, setBuyItem }) => {
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
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">${item.price}</Typography>
          <Button
            variant="contained"
            sx={{
              borderRadius: 0,
            }}
            onClick={() => setBuyItem(item)}
          >
            Buy
          </Button>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default ProductCard;
