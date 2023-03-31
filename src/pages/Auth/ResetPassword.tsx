import { TextField, Button, CircularProgress } from '@mui/material';
// import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthOutlet from './AuthOutlet';
import { useResetPasswordMutation } from '@/features/user/userApiSlice';

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const passwordRef = useRef<HTMLInputElement>();
  const confirmPasswordRef = useRef<HTMLInputElement>();
  const [newPassword, { isLoading }] = useResetPasswordMutation();
  const handleRequest = async () => {
    const pwd = passwordRef?.current?.value.replace(/\s+/g, '') || '';
    const pwdConf = confirmPasswordRef?.current?.value.replace(/\s+/g, '') || '';
    if (pwd === '') {
      toast.error('Please enter your password.');
      passwordRef?.current?.focus();
    } else if (pwdConf === '') {
      toast.error('Please confirm your password.');
      confirmPasswordRef?.current?.focus();
    } else if (pwd !== pwdConf) {
      toast.error('The passwords do not match.');
      passwordRef?.current?.focus();
    } else if (pwd.length < 6) {
      toast.error('The password must be at least 6 characters long.');
      passwordRef?.current?.focus();
    } else {
      newPassword({
        email: searchParams.get('email') || '',
        token: searchParams.get('token') || '',
        password: pwd,
      })
        .unwrap()
        .then(() => {
          toast.success("You've successfully changed your password. You can now log in.");
          setTimeout(() => {
            navigate('/login');
          }, 4000);
        })
        .catch((error) => {
          console.log(error);
          if (error?.data?.message) toast.error(error.data.message);
          else toast.error('Something went wrong. Please try again later.');
        });
    }
  };

  useEffect(() => {
    passwordRef?.current?.focus();
  }, []);

  return (
    <AuthOutlet header="New Password">
      <TextField
        id="pwd"
        type="password"
        inputRef={passwordRef}
        autoComplete="new-password"
        label="New Password"
        variant="outlined"
        autoFocus
      />
      <TextField
        id="pwdAgain"
        type="password"
        inputRef={confirmPasswordRef}
        label="Confirm New Password"
        variant="outlined"
        autoComplete="new-password"
      />
      {isLoading ? (
        <CircularProgress sx={{ margin: '0 auto', width: '100%', my: 0.5 }} />
      ) : (
        <Button fullWidth variant="contained" onClick={handleRequest}>
          Change Password
        </Button>
      )}
    </AuthOutlet>
  );
}

export default ResetPassword;
