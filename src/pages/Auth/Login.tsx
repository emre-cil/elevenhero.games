import {
  Box,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Link,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { toast } from 'react-hot-toast';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React, { useRef, useState } from 'react';
import { setCredentials } from '../../features/user/userSlice';
import AuthOutlet from './AuthOutlet';
import { useAuthMutation } from '../../features/user/userApiSlice';

function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useAuthMutation();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const loginHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const email = emailRef?.current?.value.replace(/\s+/g, '');
    const password = passwordRef?.current?.value.replace(/\s+/g, '');
    if (email === '') {
      toast.error('Please enter your e-mail address');
      emailRef?.current?.focus();
    } else if (password === '') {
      toast.error('Please enter your password');
      passwordRef?.current?.focus();
    } else {
      login({
        email,
        password,
      })
        .unwrap()
        .then((response: any) => {
          dispatch(
            setCredentials({
              accessToken: response.accessToken,
              UserInfo: response.UserInfo,
            }),
          );
          navigate('/');
        })
        .catch((error: any) => {
          if (error?.status === 'FETCH_ERROR') {
            toast.error('Server Error - Please try again later.');
          } else {
            toast.error(error?.data?.message);
          }
        });
    }
  };

  return (
    <AuthOutlet>
      <TextField inputRef={emailRef} type="email" label="E-mail" variant="outlined" autoComplete="off" />
      <Stack gap={1}>
        <TextField
          inputRef={passwordRef}
          type={showPassword ? 'text' : 'password'}
          label="Password"
          variant="outlined"
          sx={{ '& .MuiInputBase-root ': { pr: '4px' } }}
          autoComplete="new-password"
          InputProps={{
            // <-- This is where the toggle button sis added.
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Link variant="body2" textAlign="right" onClick={() => navigate('/forgot-password')}>
          Forgot password?
        </Link>
        {!isLoading ? (
          <Button variant="contained" onClick={loginHandler}>
            Login
          </Button>
        ) : (
          <CircularProgress sx={{ margin: '0 auto', width: '100%', my: 0.5 }} />
        )}
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="body2" component="p">
          Don&apos;t have an account?
        </Typography>
        <Link variant="body2" sx={{ display: 'inline', ml: 1 }} onClick={() => navigate('/register')}>
          Create an account
        </Link>
      </Box>
    </AuthOutlet>
  );
}

export default Login;
