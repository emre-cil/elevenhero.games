import InventoryCard from '@/components/Cards/InventoryCard';
import NFTCard from '@/components/Cards/NFTCard';
import Loading from '@/components/Loading';
import BoxOpenModal from '@/components/Modals/BoxOpenModal';
import SectionHeader from '@/components/SectionHeader';
import { useGetInventoryQuery } from '@/features/inventoryApiSlice';
import { Container, Grid, Stack } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
const Inventory = () => {
  const { data: inventory, isLoading } = useGetInventoryQuery(undefined);
  const [isOpen, setIsOpen] = useState(null);
  const openHandler = (itemId: string, openBox: any) => {
    openBox(itemId)
      .then((res: any) => {
        if (res?.data?.data?._id) {
          setIsOpen(res.data.data);
        } else {
          toast.error('Error occured');
        }
      })
      .catch(() => {
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
        {isLoading ? (
          <Loading loading={isLoading} />
        ) : (
          <>
            {inventory?.products?.length > 0 && (
              <>
                <SectionHeader title="Products" />
                <Grid container spacing={2}>
                  {inventory?.products?.map((item: any, idx: number) => (
                    <>
                      {item?.product && (
                        <InventoryCard
                          key={item.product?._id}
                          item={item.product}
                          count={item.count}
                          openHandler={openHandler}
                          idx={idx}
                        />
                      )}
                    </>
                  ))}
                </Grid>
              </>
            )}
            {inventory?.nfts?.length > 0 && (
              <>
                <SectionHeader title="NFTS" />
                <Grid container spacing={2}>
                  {inventory?.nfts?.map((item: any, idx: number) => (
                    <NFTCard key={item?._id} item={item} idx={idx} />
                  ))}
                </Grid>
              </>
            )}
          </>
        )}
      </Stack>
    </Container>
  );
};

export default Inventory;
