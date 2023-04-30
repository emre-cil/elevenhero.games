import { FC } from 'react';
import { Button, Stack, Typography } from '@mui/material';

type PlayerCardProps = {
  item: any;
  section: string;
  onClick: (data: any) => void;
  handleOperation: (operation: string, item: any) => void;
};

const PlayerCard: FC<PlayerCardProps> = ({ item, section, onClick, handleOperation }) => {
  return (
    <Stack
      sx={{
        backgroundColor: 'grey.900',
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
        <Typography variant="body2">€ {item?.price.toFixed(2)}</Typography>
        <Button
          variant="outlined"
          color="primary"
          sx={{ ml: 'auto', textTransform: 'capitalize', minWidth: '91px', height: '32px', borderRadius: 2 }}
          onClick={(e) => {
            e.stopPropagation();
            handleOperation(section === 'market' ? 'buy' : 'sell', item);
          }}
        >
          <Typography variant="body2">{section === 'market' ? 'Buy' : 'Sell'}</Typography>
        </Button>
      </Stack>
    </Stack>
  );
};

export default PlayerCard;
