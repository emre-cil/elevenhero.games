import { Button, Modal, Stack } from '@mui/material';
import { FC } from 'react';

interface NFTDetailModalProps {
  isOpen: any;
  setIsOpen: any;
}

const NFTDetailModal: FC<NFTDetailModalProps> = ({ isOpen, setIsOpen }) => {
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
      <Stack>
        <img src={`${import.meta.env.VITE_API_URL}/nfts/${isOpen.image}.webp`} alt={isOpen.name} />
        <Button variant="contained">add username</Button>
        <Button variant="contained">claim as NFT</Button>
      </Stack>
    </Modal>
  );
};

export default NFTDetailModal;
