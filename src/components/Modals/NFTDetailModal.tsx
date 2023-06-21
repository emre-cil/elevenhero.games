import { useAddUsernameMutation } from '@/features/nftsApiSlice';
import { Button, Modal, Stack, TextField } from '@mui/material';
import { FC, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { ethers } from 'ethers';

import ELEVENHERO from '../../artifacts/contracts/MyNFT.sol/ELEVENHERO.json';
import { useClaimNFTMutation } from '@/features/nftsApiSlice';
const contractAddress = '0x277F52F9fa0d9F36Ce9Db829f697452F9651185a';
const provider = window.ethereum && new ethers.providers.Web3Provider(window.ethereum);
const signer = provider?.getSigner();
const contract = new ethers.Contract(contractAddress, ELEVENHERO.abi, signer);

interface NFTDetailModalProps {
  isOpen: any;
  setIsOpen: any;
}

const NFTDetailModal: FC<NFTDetailModalProps> = ({ isOpen, setIsOpen }) => {
  const usernameRef = useRef<any>(null);
  const [addUsername] = useAddUsernameMutation();
  const [claimNFT, { isLoading: claimNFTLoading }] = useClaimNFTMutation();
  const usernameHandler = () => {
    const username = usernameRef.current?.value?.trim();
    if (!username) {
      toast.error('Please enter username');
    } else if (username.length < 3) {
      toast.error('Username must be at least 3 characters');
    } else if (username.length > 20) {
      toast.error('Username must be less than 20 characters');
    } else {
      addUsername({ username, id: isOpen._id })
        .unwrap()
        .then(() => {
          toast.success('Username added successfully');
          setIsOpen(null);
        })
        .catch((e) => {
          toast.error(e?.data?.message);
        });
    }
  };
  console.log(isOpen);
  const claimAsNft = () => {
    const url = isOpen?.DNA || 'tst://test';
    const connection = contract.connect(signer);
    const addr = connection.address;
    contract
      .payToMint(addr, url, {
        value: ethers.utils.parseEther('0.0051'),
        gasLimit: 500000,
      })
      .then((result: any) => {
        console.log(result);
        if (result?.hash) {
          claimNFT({ contractAddress: result?.to, hash: result?.hash, nftId: isOpen._id })
            .unwrap()
            .then(() => {
              toast.success('NFT claimed successfully');
              setIsOpen(null);
            })
            .catch((e) => {
              toast.error(e?.data?.message || 'Something went wrong');
            });
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  return (
    <Modal
      open={isOpen !== null}
      onClose={() => setIsOpen(null)}
      sx={{
        zIndex: 99999,
        userSelect: 'none',
        height: '100%',
        py: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        img: {
          webkitFilter: 'drop-shadow(5px 5px 5px #222)',
          filter: 'drop-shadow(5px 5px 15px #222)',
          width: '80%',
          maxWidth: 300,
        },
      }}
    >
      <Stack
        gap={2}
        alignItems="center"
        sx={{
          backgroundColor: 'rgba(0,0,0,0.7)',
          p: 2,
          borderRadius: 2,
          a: {
            color: 'white',
            fontSize: 16,
          },
        }}
      >
        <img src={`${import.meta.env.VITE_API_URL}/nfts/${isOpen.image}.webp`} alt={isOpen.name} />
        {!isOpen?.name && (
          <Stack direction="row" gap={2}>
            <TextField label="username" inputRef={usernameRef} />
            <Button variant="contained" onClick={usernameHandler}>
              add username
            </Button>
          </Stack>
        )}
        {!isOpen?.hash ? (
          <Button fullWidth variant="contained" onClick={claimAsNft}>
            claim as NFT
          </Button>
        ) : (
          <a href={`https://mumbai.polygonscan.com/tx/${isOpen?.hash}`} target="_blank" rel="noreferrer">
            View on PolygonScan
          </a>
        )}
      </Stack>
    </Modal>
  );
};

export default NFTDetailModal;
