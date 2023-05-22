import { FC } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface NFTCardProps {
  item: any;
  idx: number;
}

const NFTCard: FC<NFTCardProps> = ({ item, idx }) => {
  return (
    <Grid item xs={6} sm={4} md={3} xl={2.4}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.2 }}>
        <Stack
          sx={{
            img: {
              webkitFilter: 'drop-shadow(5px 5px 5px #222)',
              filter: 'drop-shadow(5px 5px 15px #222)',
              p: 1,
            },
          }}
          gap={0.5}
        >
          <img src={`${import.meta.env.VITE_API_URL}/nfts/${item.image}.webp`} alt={item.name} />

          <Typography variant="h6">{item.title}</Typography>
          <Typography>{item?.serie?.title}</Typography>
        </Stack>
      </motion.div>
    </Grid>
  );
};

export default NFTCard;
