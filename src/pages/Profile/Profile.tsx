import { useState } from 'react';
import { Button, Container, Link, Stack } from '@mui/material';
import ConnectWallet from '@/components/ConnectWallet';
import { useAppDispatch } from '@/app/store';
import { logout } from '@/features/user/userSlice';
import { useLazyLogoutQuery } from '@/features/user/userApiSlice';

function Profile() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [logoutF] = useLazyLogoutQuery();
  const logoutHandler = () => {
    dispatch(logout());
    logoutF(undefined)
      .unwrap()
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Stack>
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
