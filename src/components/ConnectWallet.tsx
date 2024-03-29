import { Box, Modal, Stack, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import metamaskImg from '@/assets/Images/metamask.webp';
import walletConnectImg from '@/assets/Images/walletconnect.webp';
import { useUpdateWalletMutation } from '@/features/user/userApiSlice';
import { toast } from 'react-hot-toast';
// import { useAppDispatch } from '@/app/store';
// import { ethers } from 'ethers';
// import { setWallet } from '@/features/user/userSlice';
const DAPP = 'https://metamask.app.link/dapp/elevenhere.games';
const chainId = import.meta.env.VITE_CHAIN_ID;
interface ConnectWalletProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
// window?.ethereum?.chainId === import.meta.env.VITE_CHAIN_ID
const ConnectWallet: FC<ConnectWalletProps> = ({ isOpen, setIsOpen }) => {
  // const dispatch = useAppDispatch();
  const [updateWallet, { isLoading: walletUploadLoading }] = useUpdateWalletMutation();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const changeAccountHandler = (address: string) => {
    updateWallet({
      walletAddress: address,
    })
      .unwrap()
      .then((res: any) => {
        toast.success('Wallet Connected');
        setIsOpen(false);
      })
      .catch((err: any) => {
        toast.error(err?.data?.message || 'Something went wrong');
      });
  };

  useEffect(() => {
    window?.ethereum?.on('accountsChanged', (accounts: any) => {
      changeAccountHandler(accounts[0]);
    });
  }, []);

  const changeChainHandler = async () => {
    if (window.ethereum) {
      const providerChainId = await window.ethereum.request({
        method: 'eth_chainId',
      });

      if (providerChainId !== chainId) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId }],
          });
        } catch (error) {
          console.log('Error while switching network:', error);
        }
      }
    } else {
      console.log('MetaMask extension not detected');
    }
  };

  const metamaskHandler = () => {
    if (isMobile && !window?.ethereum) {
      window.open(DAPP, '_blank');
    }

    if (window?.ethereum) {
      window.ethereum.enable();

      if (window?.ethereum?.chainId === chainId) {
        window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts: any) => {
          changeAccountHandler(accounts[0]);
        });
      } else {
        changeChainHandler();
      }
    } else {
      alert('Please install Metamask');
    }
  };
  const walletConnectHandler = () => {
    console.log('walletConnectHandler');
  };
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
