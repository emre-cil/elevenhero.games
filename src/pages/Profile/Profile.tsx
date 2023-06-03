import { useState } from 'react';
import { Box, Button, Container, Link, Stack, Typography } from '@mui/material';
import ConnectWallet from '@/components/ConnectWallet';
import { useAppDispatch } from '@/app/store';
import { logout } from '@/features/user/userSlice';
import { useGetDetailsQuery, useLazyLogoutQuery } from '@/features/user/userApiSlice';
import Loading from '@/components/Loading';
import TextBadgeCard from '@/components/Cards/TextBadgeCard';
import ProfileImage from './ProfileImage';

function Profile() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [logoutF] = useLazyLogoutQuery();
  const { data: details, isLoading } = useGetDetailsQuery(undefined);

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
          }}
        >
          <ProfileImage image={details?.image?.img} />
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
