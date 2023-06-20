import { FC, useState } from 'react';
import { Stack, Typography, Box, CircularProgress, Modal, Tabs, Tab } from '@mui/material';
import walletIcon from '@/assets/Icons/walletIcon.svg';
import { useGetMoneyQuery } from '@/features/user/userApiSlice';

type BalanceCardProps = {
  accessToken: string | null;
};

const BalanceCard: FC<BalanceCardProps> = ({ accessToken }) => {
  const [isOpen, setIsOpen] = useState<number | null>(null);
  console.log(isOpen);
  const { data: money, isLoading } = useGetMoneyQuery(undefined);
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue);
    setIsOpen(newValue);
  };
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        borderRadius: '8px',
        overflow: 'hidden',
        width: '120px',
        height: '30px',
        backgroundColor: 'Ink.Dark',
        cursor: 'pointer',
      }}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(1012);
      }}
    >
      {accessToken ? (
        <>
          <Box
            sx={{
              backgroundColor: 'Green.Base',
              height: '100%',
              width: '40px',
              p: '6px',
              img: {
                width: 20,
              },
            }}
          >
            <img src={walletIcon} alt="wallet icon" />
          </Box>
          {isLoading ? (
            <CircularProgress size={16} sx={{ mx: 'auto' }} />
          ) : (
            <Typography
              variant="h6"
              sx={{
                color: 'grey.900',
                textAlign: 'center',
                width: '100%',
              }}
            >
              {money?.money}
            </Typography>
          )}
        </>
      ) : (
        <Typography
          variant="body2"
          sx={{
            color: 'grey.900',
            textAlign: 'center',
            width: '100%',
          }}
        >
          PLAY
        </Typography>
      )}
      <>
        {isOpen !== null && (
          <Modal
            open={isOpen !== null}
            onClose={() => setIsOpen(13)}
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 99999,
            }}
          >
            <Stack
              sx={{
                width: 300,
                height: 300,
                backgroundColor: 'grey.200',
                borderRadius: '8px',
              }}
            >
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                {/* <Tabs value={isOpen} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Deposit" {...a11yProps(0)} />
                  <Tab label="Withdraw" {...a11yProps(1)} />
                </Tabs> */}
              </Box>
            </Stack>
          </Modal>
        )}
      </>
    </Stack>
  );
};

export default BalanceCard;
