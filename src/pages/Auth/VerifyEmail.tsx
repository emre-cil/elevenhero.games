import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CircularProgress, Stack, Typography, Button } from '@mui/material';
import { useVerifyMailQuery } from '../../features/user/userApiSlice';

function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  console.log('email', email);
  console.log('token', token);
  const { data, isLoading, isSuccess, isError } = useVerifyMailQuery({
    email,
    verificationToken: token,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success('Email verified! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
    if (isError) {
      toast.error('Email verification failed!');
    }
  }, [isSuccess, isError]);

  return (
    <Stack
      sx={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {isLoading && <CircularProgress />}
      {isSuccess && (
        <>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Email verified!
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            You can now login to your account.
          </Typography>
        </>
      )}
      {isError && (
        <>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Email verification failed!
          </Typography>

          <Button variant="contained" onClick={() => toast.error('Error: contact with customer service')}>
            Send Verification Email
          </Button>
        </>
      )}
    </Stack>
  );
}

export default VerifyEmail;
