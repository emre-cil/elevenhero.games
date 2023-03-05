import { motion } from 'framer-motion';
import { Box, Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import BannerBackground from '../../assets/Images/banner-background.jpg';
import Banners from '../../data/BannerData';
import BannerPagination from '../Paginations/BannerPagination';

function Banner() {
  const [current, setCurrent] = useState(0);

  // Triggers the banner change every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(current === Banners.length - 1 ? 0 : current + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: {
          xs: '500px',
          md: '440px',
        },
        '& .banner-background': {
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        },
      }}
    >
      <img src={BannerBackground} alt="Banner" className="banner-background" />
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'black',
          opacity: 0.7,
          zIndex: 1,
        }}
      />
      <Stack
        direction={{ xs: 'column-reverse', md: 'row' }}
        alignItems="center"
        justifyContent="center"
        gap={{
          xs: '20px',
          md: '120px',
        }}
        sx={{
          height: '100%',
          '& .banner-img': {
            height: { xs: '230px', md: '340px' },
            objectFit: 'contain',
          },
          '& *': {
            zIndex: 2,
          },
        }}
      >
        {/* LEFT SIDE OF BANNER */}
        <Stack
          gap={3}
          sx={{
            minWidth: '400px',
            pl: { xs: 10, md: 0 },
          }}
        >
          <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <Typography
              color="Sky.White"
              component="h1"
              sx={{
                lineHeight: { xs: '30px', md: '91px' },
                fontSize: { xs: '36px', md: '72px' },
                fontWeight: 700,
              }}
            >
              NEW
            </Typography>
            <Typography
              color="Sky.White"
              component="h1"
              textTransform="uppercase"
              sx={{
                lineHeight: { xs: '50px', md: '70px' },
                fontSize: { xs: '36px', md: '56px' },
                fontWeight: 700,
              }}
            >
              {Banners[current]?.title}
            </Typography>
            <BannerPagination current={current} setCurrent={setCurrent} length={Banners.length} />
          </motion.div>
        </Stack>
        {/* RIGHT SIDE OF BANNER */}
        <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
          <img className="banner-img" src={Banners[current]?.image} alt="" />
        </motion.div>
      </Stack>
    </Box>
  );
}

export default Banner;
