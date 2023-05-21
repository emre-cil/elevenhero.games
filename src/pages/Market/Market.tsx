import ProductCard from '@/components/Cards/ProductCard';
import { useBuyProductMutation, useGetProductsQuery } from '@/features/productsApiSlice';
import { Container, Grid } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import DefaultModal from '@/components/Modals/DefaultModal';
import Loading from '@/components/Loading';

function Market() {
  const [buyItem, setBuyItem] = useState<any>(null);
  const { data: products, isLoading: productsLoading } = useGetProductsQuery(undefined);
  const [buyProduct, { isLoading }] = useBuyProductMutation();
  const handleBuy = () => {
    buyProduct({
      id: buyItem?._id,
      count: buyItem?.count,
    })
      .unwrap()
      .then(() => {
        toast.success('Product bought successfully!');
        setBuyItem(null);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      })
      .finally(() => {
        setBuyItem(null);
      });
  };

  return (
    <Container sx={{ py: 3 }}>
      {productsLoading ? (
        <Loading loading={productsLoading} />
      ) : (
        <Grid container spacing={3}>
          {products?.map((item: any, idx: number) => (
            <ProductCard key={item?._id} item={item} setBuyItem={setBuyItem} idx={idx} />
          ))}
        </Grid>
      )}
      <DefaultModal
        open={buyItem !== null}
        setOpen={setBuyItem}
        onSuccess={handleBuy}
        successText="Buy"
        title={`Are you sure you want to buy ${buyItem?.count} x ${buyItem?.title} for ${
          buyItem?.count * buyItem?.price
        }?`}
        successColor="success.main"
        successLoading={isLoading}
      />
    </Container>
  );
}

export default Market;
