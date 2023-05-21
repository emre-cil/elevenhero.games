import { FC } from 'react';
import { Button, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { useOpenBoxMutation } from '@/features/productsApiSlice';
import { motion } from 'framer-motion';

interface InventoryCardProps {
  item: any;
  count: number;
  openHandler: any;
  idx: number;
}

const InventoryCard: FC<InventoryCardProps> = ({ item, count, openHandler, idx }) => {
  const [openBox, { isLoading }] = useOpenBoxMutation();

  return (
    <Grid item xs={6} sm={6} md={4}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
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
      </motion.div>
    </Grid>
  );
};

export default InventoryCard;
