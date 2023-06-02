import { useState } from 'react';
import { Box, Button, Container, Link, Stack, Typography } from '@mui/material';
import ConnectWallet from '@/components/ConnectWallet';
import { useAppDispatch } from '@/app/store';
import { logout } from '@/features/user/userSlice';
import { useGetDetailsQuery, useLazyLogoutQuery, useUpdateImageMutation } from '@/features/user/userApiSlice';
import Loading from '@/components/Loading';
import TextBadgeCard from '@/components/Cards/TextBadgeCard';

function Profile() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<any>();
  const dispatch = useAppDispatch();
  const [logoutF] = useLazyLogoutQuery();
  const { data: details, isLoading } = useGetDetailsQuery(undefined);
  const [updateImage, { isLoading: isUpdatingImage }] = useUpdateImageMutation();

  console.log(details);

  const handleOperation = (img: any) => {
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
    const formData = new FormData();
    formData.append('image', img);

    if (img) {
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
    }
  };
  // wins, losses, draws, monthlyScore, totalScore, username, walletAddress, image
  const logoutHandler = () => {
    dispatch(logout());
    logoutF(undefined);
  };
  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Stack gap={2}>
        <Loading loading={isLoading} />
        <Stack
          direction={{
            xs: 'column',
            md: 'row',
          }}
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          sx={{
            borderRadius: '8px',
            overflow: 'hidden',
            img: {
              width: 200,
              height: 200,
              objectFit: 'cover',
              borderRadius: '50%',
            },
          }}
        >
          <img
            src={`${import.meta.env.VITE_API_URL}/profiles/${details?.image ? details?.image : 'blankProfile.webp'}`}
            alt="profile"
            style={{
              height: '100%',
              maxWidth: '100%',
              objectFit: 'cover',
            }}
          />
          <Stack
            gap={2}
            sx={{
              flex: 1,
              width: '100%',
              backgroundColor: 'Ink.Base',
              p: 2,
              borderRadius: '8px',
            }}
          >
            <Stack direction="row" gap={2}>
              <TextBadgeCard title="Username" text={details?.username} />
              <TextBadgeCard title="Money" text={details?.money} />
            </Stack>

            <Stack direction="row" gap={2}>
              <TextBadgeCard title="Total Score" text={details?.totalScore} />
              <TextBadgeCard title="Monthly Score" text={details?.monthlyScore} />
            </Stack>
            <Stack direction="row" gap={2}>
              <TextBadgeCard title="Wins" text={details?.wins} />
              <TextBadgeCard title="Draws" text={details?.draws} />
              <TextBadgeCard title="Losses" text={details?.losses} />
            </Stack>
          </Stack>
        </Stack>
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
