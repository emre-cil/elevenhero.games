import InventoryCard from '@/components/Cards/InventoryCard';
import { useGetInventoryQuery } from '@/features/inventoryApiSlice';
import { Container, Grid, Stack, Typography } from '@mui/material';

const Inventory = () => {
  const { data: inventory, isLoading } = useGetInventoryQuery(undefined);
  console.log(inventory);
  return (
    <Container>
      <Stack gap={2}>
        <Typography variant="h3">Products</Typography>
        <Grid container spacing={2}>
          {inventory?.products?.map((item: any) => (
            <InventoryCard key={item._id} item={item.product} count={item.count} />
          ))}
        </Grid>
        <Typography variant="h3">NFTS</Typography>
      </Stack>
    </Container>
  );
};

export default Inventory;
