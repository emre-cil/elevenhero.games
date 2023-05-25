import { useAddUsernameMutation } from '@/features/nftsApiSlice';
import { Button, Modal, Stack, TextField } from '@mui/material';
import { FC, useRef } from 'react';
import { toast } from 'react-hot-toast';
interface NFTDetailModalProps {
  isOpen: any;
  setIsOpen: any;
}

const NFTDetailModal: FC<NFTDetailModalProps> = ({ isOpen, setIsOpen }) => {
  const usernameRef = useRef<any>(null);
  const [addUsername, { isLoading }] = useAddUsernameMutation();

  const usernameHandler = () => {
    const username = usernameRef.current?.value?.trim();
    console.log(username);
    if (!username) {
      toast.error('Please enter username');
    } else if (username.length < 3) {
      toast.error('Username must be at least 3 characters');
    } else if (username.length > 20) {
      toast.error('Username must be less than 20 characters');
    } else {
      addUsername({ username, id: isOpen._id })
        .unwrap()
        .then((res: any) => {
          toast.success('Username added successfully');
        })
        .catch((e) => {
          toast.error(e?.data?.message);
        });
    }
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
        <Button fullWidth variant="contained">
          claim as NFT
        </Button>
      </Stack>
    </Modal>
  );
};

export default NFTDetailModal;
