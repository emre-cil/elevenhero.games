import { FC, useRef } from 'react';
import { Button, Grid, Input, Stack, Typography } from '@mui/material';
import { toast } from 'react-hot-toast';

interface ProductCardProps {
  item: any;
  setBuyItem: any;
}

const ProductCard: FC<ProductCardProps> = ({ item, setBuyItem }) => {
  const countRef = useRef<any>(null);
  return (
    <Grid
      item
      xs={6}
      sm={6}
      md={4}
      sx={{
        minHeight: '100%',
      }}
    >
      <Stack
        sx={{
          backgroundColor: 'secondary.dark',
          p: 1,
          boxShadow: 5,
          minHeight: '100%',
        }}
        justifyContent="space-between"
        gap={0.5}
      >
        <img src={`${import.meta.env.VITE_API_URL}/uploads/${item.image}`} alt={item.name} />

        <Typography
          variant="h6"
          sx={{
            lineHeight: 0.9,
          }}
        >
          {item.title}
        </Typography>
        <Typography
          sx={{
            mt: -0.75,
            fontSize: '0.8rem',
          }}
        >
          {item?.serie?.title}
        </Typography>
        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          justifyContent="space-between"
          gap={1}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" gap={0.5}>
            <Typography
              variant="h6"
              sx={{
                lineHeight: '32px',
              }}
            >
              ${item.price}
            </Typography>
            <Input
              type="number"
              sx={{
                width: '50px',
                mr: 1,
                textAlign: 'center',
                input: {
                  textAlign: 'center',
                  // set buttons to left
                  position: 'relative',
                  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                    '-webkit-appearance': 'none',
                    margin: 0,
                  },
                  '&[type=number]': {
                    '-moz-appearance': 'textfield',
                  },
                },
              }}
              defaultValue={1}
              inputRef={countRef}
              inputProps={{
                min: 1,
              }}
            />
          </Stack>
          <Button
            variant="contained"
            sx={{
              borderRadius: 0,
            }}
            onClick={() => {
              const value = parseInt(countRef.current.value);
              // if value non or less than 1
              if (!value || value < 1) {
                toast.error('Please enter a valid number');
                return;
              } else {
                setBuyItem({
                  ...item,
                  count: countRef.current.value,
                });
              }
            }}
          >
            Buy
          </Button>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default ProductCard;
