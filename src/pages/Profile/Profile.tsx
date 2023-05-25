import { useState } from 'react';
import { Button, Container, Link, Stack } from '@mui/material';
import ConnectWallet from '@/components/ConnectWallet';
import { useAppDispatch } from '@/app/store';
import { logout } from '@/features/user/userSlice';
import { useGetDetailsQuery, useLazyLogoutQuery, useUpdateImageMutation } from '@/features/user/userApiSlice';
import Loading from '@/components/Loading';

function Profile() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [logoutF] = useLazyLogoutQuery();
  const { data: details, isLoading } = useGetDetailsQuery(undefined);
  const [updateImage, { isLoading: isUpdatingImage }] = useUpdateImageMutation();

  console.log(details);

  // wins, losses, draws, monthlyScore, totalScore, username, walletAddress, image
  const logoutHandler = () => {
    dispatch(logout());
    logoutF(undefined);
  };
  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Stack>
        <Loading loading={isLoading} />
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
