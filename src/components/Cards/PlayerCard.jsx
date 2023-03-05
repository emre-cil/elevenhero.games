import { Button, Stack, Typography } from '@mui/material';

function PlayerCard({ item, section, onClick, handleOperation }) {
  return (
    <Stack
      sx={{
        backgroundColor: 'Sky.White',
        borderRadius: 2,
        userSelect: 'none',
        zIndex: 1,
        cursor: 'pointer',
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: 3,
        },
      }}
      onClick={() => {
        onClick({
          id: item?.id,
          section,
        });
      }}
    >
      <img src={item?.photoUrl} alt="" />
      <Stack direction="row" alignItems="center" p={2} pt={0}>
        <Typography variant="RegularNormalBold">€ {item?.price.toFixed(2)}</Typography>
        <Button
          variant="outlined"
          color="primary"
          sx={{ ml: 'auto', textTransform: 'capitalize', minWidth: '91px', height: '32px', borderRadius: 2 }}
          onClick={(e) => {
            e.stopPropagation();
            handleOperation(section === 'market' ? 'buy' : 'sell', item);
          }}
        >
          <Typography variant="RegularNoneMedium">{section === 'market' ? 'Buy' : 'Sell'}</Typography>
        </Button>
      </Stack>
    </Stack>
  );
}

export default PlayerCard;
