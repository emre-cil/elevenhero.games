import InventoryCard from '@/components/Cards/InventoryCard';
import NFTCard from '@/components/Cards/NFTCard';
import { useGetInventoryQuery } from '@/features/inventoryApiSlice';
import { Container, Grid, Stack, Typography } from '@mui/material';

const Inventory = () => {
  const { data: inventory, isLoading } = useGetInventoryQuery(undefined);
  console.log(inventory);
  return (
    <Container
      sx={{
        py: 2,
      }}
    >
      <Stack gap={2}>
        <Typography variant="h3">Products</Typography>
        <Grid container spacing={2}>
          {inventory?.products?.map((item: any) => (
            <InventoryCard key={item._id} item={item.product} count={item.count} prodId={item._id} />
          ))}
        </Grid>
        <Typography variant="h3">NFTS</Typography>
        <Grid container spacing={2}>
          {inventory?.nfts?.map((item: any) => (
            <NFTCard key={item._id} item={item} />
          ))}
        </Grid>
      </Stack>
    </Container>
  );
};

export default Inventory;
