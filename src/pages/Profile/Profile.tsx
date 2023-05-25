import { useState } from 'react';
import { Box, Button, Container, Link, Stack } from '@mui/material';
import ConnectWallet from '@/components/ConnectWallet';
import { useAppDispatch } from '@/app/store';
import { logout } from '@/features/user/userSlice';
import { useGetDetailsQuery, useLazyLogoutQuery, useUpdateImageMutation } from '@/features/user/userApiSlice';
import Loading from '@/components/Loading';

function Profile() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<any>();
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const dispatch = useAppDispatch();
  const [logoutF] = useLazyLogoutQuery();
  const { data: details, isLoading } = useGetDetailsQuery(undefined);
  const [updateImage, { isLoading: isUpdatingImage }] = useUpdateImageMutation();

  console.log(details);

  const handleOperation = () => {
    //     .then((res: any) => {
    //       if (res?.data?.message) {
    //         toast.success(res?.data?.message);
    //         handleClear();
    //       }
    //       if (res?.error) {
    //         toast.error('Update product failed');
    //       }
    //     })
    //     .catch(() => {
    //       toast.error('Update product failed');
    //     });
    // } else {
    //   const formData = new FormData();
    //   formData.append('title', Title);
    //   formData.append('price', Price.toString());
    //   formData.append('description', Description);
    //   formData.append('image', selectedImage);
    //   formData.append('isActive', isActive.toString());
    //   serie && formData.append('serie', serie._id);
    //   createObject(formData)
    //     .then((res: any) => {
    //       if (res?.error) {
    //         toast.error('Add product failed');
    //       } else {
    //         toast.success('Add product successfully');
    //         handleClear();
    //       }
    //     })
    //     .catch(() => {
    //       toast.error('Add product failed');
    //     });
    // }
    console.log(selectedImage);
    const formData = new FormData();
    formData.append('image', selectedImage);

    updateImage({
      data: formData,
    })
      .unwrap()
      .then((res: any) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // wins, losses, draws, monthlyScore, totalScore, username, walletAddress, image
  const logoutHandler = () => {
    dispatch(logout());
    logoutF(undefined);
  };
  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Stack>
        <Loading loading={isLoading} />
        <Box
          sx={{
            display: 'flex',
            '& .file-dropzone': {
              p: 1.5,
              borderRadius: '50%',
              width: 200,
              height: 200,
              border: '1px dashed #ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            },
            '& .file-input': {
              display: 'none',
            },
          }}
        >
          <label htmlFor="image" className="file-dropzone">
            <img
              src={imageSrc ? imageSrc : `${import.meta.env.VITE_API_URL}/uploads/${details?.image}`}
              alt="profile"
              style={{
                height: '100%',
                maxWidth: '100%',
                objectFit: 'cover',
              }}
            />

            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e: any) => {
                if (e.target.files[0]) {
                  setSelectedImage(e.target.files[0]);
                  const reader = new FileReader();
                  reader.onload = () => {
                    const imageSrc = reader.result as string;
                    setImageSrc(imageSrc);
                  };
                  reader.readAsDataURL(e.target.files[0]);
                }
                handleOperation();
              }}
              className="file-input"
            />
          </label>
        </Box>
        <Button variant="contained" onClick={() => setIsWalletModalOpen(true)}>
          Connect Wallet
        </Button>
        <Stack alignItems="center" justifyContent="center" sx={{ py: 2 }}>
          <Link onClick={logoutHandler}>Log out</Link>
        </Stack>
      </Stack>
      <ConnectWallet isOpen={isWalletModalOpen} setIsOpen={setIsWalletModalOpen} />
    </Container>
  );
}

export default Profile;
