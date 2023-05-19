import InventoryCard from '@/components/Cards/InventoryCard';
import NFTCard from '@/components/Cards/NFTCard';
import BoxOpenModal from '@/components/Modals/BoxOpenModal';
import { useGetInventoryQuery } from '@/features/inventoryApiSlice';
import { Container, Grid, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
const Inventory = () => {
  const { data: inventory, isLoading } = useGetInventoryQuery(undefined);
  const [isOpen, setIsOpen] = useState(null);
  const openHandler = (itemId: string, openBox: any) => {
    openBox(itemId)
      .then((res: any) => {
        console.log(res);
        if (res?.data?.data?._id) {
          setIsOpen(res.data.data);
        } else {
          toast.error('Error occured');
        }
      })
      .catch((err: any) => {
        console.log(err);
        toast.error('Error opening box');
      });
  };

  return (
    <Container
      sx={{
        py: 2,
      }}
    >
      {isOpen && <BoxOpenModal isOpen={isOpen} setIsOpen={setIsOpen} />}
      <Stack gap={2}>
        {inventory?.products?.length > 0 && (
          <>
            <Typography
              variant="h3"
              textAlign="center"
              sx={{
                boxShadow: 4,
                p: 1,
                background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(61, 117, 65, 0.5) 50%, rgba(0,0,0,0) 100%)',
              }}
            >
              Products
            </Typography>
            <Grid container spacing={2}>
              {inventory?.products?.map((item: any) => (
                <>
                  {item?.product && (
                    <InventoryCard
                      key={item.product?._id}
                      item={item.product}
                      count={item.count}
                      openHandler={openHandler}
                    />
                  )}
                </>
              ))}
            </Grid>
          </>
        )}
        {inventory?.nfts?.length > 0 && (
          <>
            <Typography
              variant="h3"
              textAlign="center"
              sx={{
                boxShadow: 4,
                p: 1,
                background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(61, 117, 65, 0.5) 50%, rgba(0,0,0,0) 100%)',
              }}
            >
              NFTS
            </Typography>
            <Grid container spacing={2}>
              {inventory?.nfts?.map((item: any) => (
                <NFTCard key={item?._id} item={item} />
              ))}
            </Grid>
          </>
        )}
      </Stack>
    </Container>
  );
};

export default Inventory;
