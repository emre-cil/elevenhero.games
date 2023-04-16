import React, { useState } from 'react';
import { Button, Container, Stack } from '@mui/material';
import ConnectWallet from '../../components/ConnectWallet';

function Profile() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Stack>
        <Button variant="contained" onClick={() => setIsWalletModalOpen(true)}>
          Connect Wallet
        </Button>
      </Stack>
      <ConnectWallet isOpen={isWalletModalOpen} setIsOpen={setIsWalletModalOpen} />
    </Container>
  );
}

export default Profile;
