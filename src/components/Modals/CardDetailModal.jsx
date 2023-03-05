import { Button, Stack, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '../../assets/Icons/close.svg';

function CardDetailModal({ data, setSelected, selected, handleOperation }) {
  const theme = useTheme();
  const selectGradient = (type) => {
    switch (type) {
      case 'Gold':
        return theme.palette.Gradient.Gold;
      case 'Silver':
        return theme.palette.Gradient.Silver;
      case 'Bronze':
        return theme.palette.Gradient.Bronze;
      default:
        return 'White';
    }
  };

  const miniCard = (head, text) => (
    <Stack
      p={3}
      sx={{
        backgroundColor: 'Sky.Lighter',
        borderRadius: 2,
        flex: 1,
      }}
    >
      <Typography variant="LargeNormalRegular" component="h3" color="Ink.Darkest">
        {head}
      </Typography>
      <Typography variant="Title3" component="h3" color="Ink.Darkest">
        {text}
      </Typography>
    </Stack>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <Stack
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          border: 'none',
          minWidth: '914px',
          position: 'relative',
        }}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          onClick={() => setSelected(null)}
          sx={{
            position: 'absolute',
            top: 24,
            right: 24,
            opacity: 0.3,
            borderRadius: 2,
            backgroundColor: 'Ink.Dark',
            height: '48px',
            width: '48px',
            cursor: 'pointer',
          }}
        >
          <img src={CloseIcon} alt="close icon" />
        </Stack>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            height: '382px',
            background: selectGradient(data?.cardType),
            img: {
              height: '286px',
              objectFit: 'contain',
            },
          }}
        >
          <img src={data?.photoUrl} alt={data?.name} />
        </Stack>
        <Stack
          p={3}
          gap={3}
          sx={{
            backgroundColor: 'Sky.White',
            height: '488px',
          }}
        >
          <Stack direction="row" gap={3}>
            <Stack flex={1} justifyContent="center" pr={6}>
              <Typography variant="Title3" component="h3" color="Red.Base">
                {data?.name}
              </Typography>
              <Typography variant="LargeNormalRegular" component="p" color="Ink.Darkest">
                {data?.position}
              </Typography>
            </Stack>
            <Stack
              flex={1}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: 'Sky.Lighter',
              }}
            >
              <Typography variant="Title3" component="h3" color="Ink.Darkest">
                € {data?.price.toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  textTransform: 'Capitalize',
                  height: '48px',
                  width: '174px',
                }}
                onClick={() => handleOperation(selected.section === 'market' ? 'buy' : 'sell', data)}
              >
                {selected?.section === 'market' ? 'Buy' : 'Sell'}
              </Button>
            </Stack>
          </Stack>
          <Stack
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: 'Sky.Lighter',
            }}
          >
            <Typography variant="LargeNormalBold" component="h3" color="Ink.Darkest">
              ATTRIBUTES
            </Typography>
            <Stack gap="22px" direction="row" mt={2}>
              {data?.attributes &&
                Object.keys(data?.attributes).map((key) => (
                  <Stack
                    key={key}
                    sx={{
                      backgroundColor: 'Sky.White',
                      borderRadius: 2,
                      p: 3,
                      width: '118px',
                    }}
                  >
                    <Typography
                      variant="LargeNormalRegular"
                      component="h3"
                      color="Ink.Darkest"
                      textTransform="capitalize"
                    >
                      {key}
                    </Typography>
                    <Typography variant="Title3" component="p" color="Ink.Darkest">
                      {data?.attributes[key]}
                      <Typography variant="LargeNormalRegular" display="inline" color="Sky.Dark">
                        /100
                      </Typography>
                    </Typography>
                  </Stack>
                ))}
            </Stack>
          </Stack>
          <Stack direction="row" gap={3}>
            {miniCard('Team', data?.team)}
            {miniCard('Card Type', data?.cardType)}
          </Stack>
        </Stack>
      </Stack>
    </motion.div>
  );
}

export default CardDetailModal;
