import ProductCard from '@/components/Cards/ProductCard';
import { useBuyProductMutation, useGetProductsQuery } from '@/features/productsApiSlice';
import { Container, Grid } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import DefaultModal from '@/components/Modals/DefaultModal';

function Market() {
  const [buyItem, setBuyItem] = useState<any>(null);
  const { data: products } = useGetProductsQuery(undefined);
  const [buyProduct, { isLoading }] = useBuyProductMutation();
  console.log(products);
  const handleBuy = () => {
    buyProduct(buyItem?._id)
      .unwrap()
      .then(() => {
        toast.success('Product bought successfully!');
        setBuyItem(null);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.data?.message);
      })
      .finally(() => {
        setBuyItem(null);
      });
  };

  return (
    <Container sx={{ py: 3 }}>
      <Grid container spacing={3}>
        {products?.map((item: any) => (
          <ProductCard key={item?._id} item={item} setBuyItem={setBuyItem} />
        ))}
      </Grid>
      <DefaultModal
        open={buyItem !== null}
        setOpen={setBuyItem}
        onSuccess={handleBuy}
        successText="Buy"
        title={`Are you sure you want to buy ${buyItem?.title}?`}
        successColor="success.main"
        successLoading={isLoading}
      />
    </Container>
  );
}

export default Market;
