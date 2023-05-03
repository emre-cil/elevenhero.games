import { Typography, TextField, Button, CircularProgress } from '@mui/material';
import { useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import AuthOutlet from './AuthOutlet';
import { useForgotPasswordMutation } from '@/features/user/userApiSlice';

function ForgotPassword() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const handleRequest = async () => {
    const email = emailRef?.current?.value.replace(/\s+/g, '') || '';
    if (email === '') {
      toast.error('Please enter your e-mail address');
      emailRef?.current?.focus();
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{1,20}$/.test(email)) {
      toast.error('Please enter a valid e-mail address');
      emailRef?.current?.focus();
    } else {
      forgotPassword(email)
        .unwrap()
        .then((res) => {
          toast.success(res?.message);
          setTimeout(() => {
            navigate('/login');
          }, 4000);
        })
        .catch((error) => {
          if (error?.data?.message) toast.error(error.data.message);
          else toast.error('Something went wrong. Please try again later.');
        });
    }
  };

  return (
    <AuthOutlet header="Forgot Password">
      <Typography variant="body1">Reset password link will be sent to your email.</Typography>
      <TextField
        autoFocus
        id="email"
        inputRef={emailRef}
        label="Email"
        type="email"
        variant="outlined"
        autoComplete="off"
      />
      {isLoading ? (
        <CircularProgress sx={{ margin: '0 auto', width: '100%', my: 0.5 }} />
      ) : (
        <Button fullWidth variant="contained" onClick={handleRequest}>
          Reset Password
        </Button>
      )}
    </AuthOutlet>
  );
}

export default ForgotPassword;
