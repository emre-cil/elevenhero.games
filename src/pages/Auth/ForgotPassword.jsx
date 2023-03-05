import { Typography, TextField, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import AuthOutlet from './AuthOutlet';

function ForgotPassword() {
  const navigate = useNavigate();
  const emailRef = useRef();
  // const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const isLoading = false;
  const handleRequest = async () => {
    const email = emailRef.current.value.replace(/\s+/g, '');
    if (email === '') {
      toast.error('Please enter your e-mail address');
      emailRef.current.focus();
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{1,20}$/.test(email)) {
      toast.error('Please enter a valid e-mail address');
      emailRef.current.focus();
    } else {
      // forgotPassword({
      //   Email: email,
      // })
      //   .unwrap()
      //   .then((res) => {
      //     toast.success(res.Data.Message);
      //     setTimeout(() => {
      //       navigate('/login');
      //     }, 4000);
      //   })
      //   .catch((error) => {
      //     if (error?.data?.InfoList[0]?.ShowToUser) {
      //       toast.error(error.data.InfoList[0]?.Message);
      //     } else {
      //       toast.error('Bir hata oluştu.');
      //     }
      //   });
    }
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <AuthOutlet header="Forgot Password">
      <Typography variant="body1">Reset password link will be sent to your email.</Typography>
      <TextField id="email" inputRef={emailRef} label="Email" type="email" variant="outlined" autoComplete="off" />
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
