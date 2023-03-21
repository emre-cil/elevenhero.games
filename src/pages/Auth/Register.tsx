import { Box, Typography, TextField, Button, Link, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useRef } from 'react';
import { toast } from 'react-hot-toast';
import AuthOutlet from './AuthOutlet';
import { useRegisterMutation } from '../../features/user/userApiSlice';

function Register() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const registerHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const email = emailRef?.current?.value.replace(/\s+/g, '') || '';
    const username = usernameRef?.current?.value.replace(/\s+/g, '') || '';
    const password = passwordRef?.current?.value.replace(/\s+/g, '') || '';
    const pwdConf = passwordConfRef?.current?.value.replace(/\s+/g, '') || '';
    if (email === '') {
      toast.error('Please enter your e-mail address');
      emailRef?.current?.focus();
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{1,20}$/.test(email)) {
      toast.error('Please enter a valid e-mail address');
      emailRef?.current?.focus();
    } else if (username === '') {
      toast.error('Please enter your username');
      usernameRef?.current?.focus();
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      toast.error('Username can only contain letters, numbers and underscores');
      usernameRef?.current?.focus();
    } else if (username.length < 3) {
      toast.error('Username must be at least 3 characters long');
      usernameRef?.current?.focus();
    } else if (password === '') {
      toast.error('Please enter your password');
      passwordRef?.current?.focus();
    } else if (pwdConf === '') {
      toast.error('Please confirm your password');
      passwordConfRef?.current?.focus();
    } else if (password !== pwdConf) {
      toast.error('Passwords do not match');
      passwordRef?.current?.focus();
    } else if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      passwordRef?.current?.focus();
    } else {
      register({
        email,
        password,
        username,
      })
        .unwrap()
        .then(() => {
          toast.success("You've successfully registered! Check your e-mail for verification.");
          setTimeout(() => {
            navigate('/login');
          }, 4000);
        })
        .catch((error: any) => {
          if (error?.status === 'FETCH_ERROR') {
            toast.error('Server Error - Please try again later.');
          } else {
            toast.error(error?.originalStatus === 409 ? 'E-mail already exists' : error?.data?.message);
          }
        });
    }
  };

  return (
    <AuthOutlet>
      <TextField inputRef={emailRef} type="email" label="E-mail" variant="outlined" autoComplete="off" autoFocus />
      <TextField inputRef={usernameRef} label="Username" variant="outlined" />
      <TextField
        inputRef={passwordRef}
        type="password"
        autoComplete="new-password"
        label="Password"
        variant="outlined"
      />
      <TextField
        inputRef={passwordConfRef}
        hidden
        type="password"
        autoComplete="new-password"
        label="Password Confirmation"
        variant="outlined"
      />
      {!isLoading ? (
        <Button variant="contained" onClick={registerHandler}>
          Register
        </Button>
      ) : (
        <CircularProgress sx={{ margin: '0 auto', width: '100%', my: 0.5 }} />
      )}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="body2" component="p">
          Already have an account?{' '}
        </Typography>
        <Link variant="body2" sx={{ display: 'inline', ml: 1 }} onClick={() => navigate('/login')}>
          Sign In
        </Link>
      </Box>
    </AuthOutlet>
  );
}

export default Register;
