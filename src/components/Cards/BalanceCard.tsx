import { FC, useState } from 'react';
import { Stack, Typography, Box, CircularProgress, Modal, Tabs, Tab, TextField, Button } from '@mui/material';
import walletIcon from '@/assets/Icons/walletIcon.svg';
import { useGetMoneyQuery } from '@/features/user/userApiSlice';

type BalanceCardProps = {
  accessToken: string | null;
};

const BalanceCard: FC<BalanceCardProps> = ({ accessToken }) => {
  const [isOpen, setIsOpen] = useState<number>(-1);

  const { data: money, isLoading } = useGetMoneyQuery(undefined);
  const a11yProps = (index: any) => {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  };
  const handleChange = (event: any, newValue: any) => {
    setIsOpen(newValue);
  };
  return (
    <>
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
        onClick={() => {
          setIsOpen(0);
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
      </Stack>
      <Modal
        open={isOpen !== -1}
        onClose={(e: any) => {
          e.stopPropagation();
          setIsOpen(-1);
        }}
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
            backgroundColor: 'grey.200',
            borderRadius: '8px',
          }}
          gap={2}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              sx={{
                maxHeight: '10vh',
                '.MuiTabs-flexContainer': {
                  justifyContent: 'space-between',
                },

                '.MuiTab-root': {
                  fontSize: '0.75rem',
                  minWidth: '20px',
                  flex: '1',
                },
              }}
              value={isOpen}
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              indicatorColor="primary"
              onChange={handleChange}
              aria-label="scrollable auto tabs example"
            >
              <Tab label="Deposit" {...a11yProps(0)} />
              <Tab label="Withdraw" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TextField label="amount" type="number" sx={{ width: '80%', mx: 'auto' }} />
          <Button variant="contained" sx={{ width: '80%', mx: 'auto', mb: '40px' }}>
            {isOpen === 0 ? 'Deposit' : 'Withdraw'}
          </Button>
        </Stack>
      </Modal>
    </>
  );
};

export default BalanceCard;
