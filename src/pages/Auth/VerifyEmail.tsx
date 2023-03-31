import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CircularProgress, Stack, Typography } from '@mui/material';
import { useVerifyMailQuery, useSendVerificationEmailMutation } from '@/features/user/userApiSlice';
import DefaultModal from '@/components/Modals/DefaultModal';

function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [sendActivationEmail, { isLoading: verificationLoading }] = useSendVerificationEmailMutation();
  const [modalText, setModalText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  const { isLoading, isSuccess, isError } = useVerifyMailQuery({
    email,
    verificationToken: token,
  });

  const handleVerify = () => {
    sendActivationEmail(email?.trim())
      .unwrap()
      .then(() => {
        toast.success("We've sent you an email. Please check your inbox and verify your account.");
      })
      .catch((e: Error) => {
        console.log(e);
      })
      .finally(() => {
        navigate('/login');
      });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success('Email verified! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
    if (isError) {
      setIsModalOpen(() => {
        setModalText('Email verification failed it may be expired or invalid . Send another verification code?');
        return true;
      });
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

      {isModalOpen && (
        <DefaultModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          onSuccess={handleVerify}
          title={modalText}
          successText="Send Code"
          successColor="success.main"
          timer="verificationTimer"
          successLoading={verificationLoading}
        />
      )}
    </Stack>
  );
}

export default VerifyEmail;
