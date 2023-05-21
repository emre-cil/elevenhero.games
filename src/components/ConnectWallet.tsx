import { Box, Modal, Stack, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import metamaskImg from '@/assets/Images/metamask.webp';
import walletConnectImg from '@/assets/Images/walletconnect.webp';
import { useAppDispatch } from '@/app/store';
import { ethers } from 'ethers';
import { setWallet } from '@/features/user/userSlice';
const DAPP = 'https://metamask.app.link/dapp/elevenhere.games';
interface ConnectWalletProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const ConnectWallet: FC<ConnectWalletProps> = ({ isOpen, setIsOpen }) => {
  const dispatch = useAppDispatch();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const changeAccountHandler = (address: string) => {
    window?.ethereum?.request({ method: 'eth_getBalance', params: [address, 'latest'] }).then((balance: any) => {
      setIsOpen(false);
    });
  };

  useEffect(() => {
    window?.ethereum?.on('accountsChanged', (accounts: any) => {
      changeAccountHandler(accounts[0]);
    });
  }, []);

  const metamaskHandler = () => {
    if (isMobile && !window?.ethereum) {
      window.open(DAPP, '_blank');
    }

    if (window?.ethereum) {
      if (window?.ethereum?.chainId === '0x13881') {
        window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts: any) => {
          changeAccountHandler(accounts[0]);
        });
      } else {
        // changeChainHandler().then(() => {
        //   window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
        //     changeAccountHandler(accounts[0]);
        //   });
        // });
      }
    } else {
      alert('Please install Metamask');
    }
  };
  const walletConnectHandler = () => {};
  const wallets = [
    {
      name: 'Metamask',
      img: metamaskImg,
      onClick: () => {
        metamaskHandler();
      },
    },
    {
      name: 'WalletConnect',
      img: walletConnectImg,
      onClick: () => {
        walletConnectHandler();
      },
    },
  ];

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      sx={{
        zIndex: 1000000,
      }}
    >
      <Stack
        sx={{
          width: 'fit-content',
          maxWidth: '400px',
          backgroundColor: 'grey.50',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '10px',
          boxShadow: 4,
          p: 2,
        }}
        gap={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        {wallets.map((wallet) => (
          <Stack
            sx={{
              cursor: 'pointer',
            }}
            alignItems="center"
            gap={1}
            key={wallet.name}
            onClick={wallet.onClick}
          >
            <Box
              sx={{
                width: '100px',
                height: '100px',
                borderRadius: '10px',
                boxShadow: 4,
                backgroundColor: 'grey.100',
                img: {
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                },
              }}
            >
              <img src={wallet.img} alt={wallet.name} />
            </Box>
            <Typography>{wallet.name}</Typography>
          </Stack>
        ))}
      </Stack>
    </Modal>
  );
};

export default ConnectWallet;
