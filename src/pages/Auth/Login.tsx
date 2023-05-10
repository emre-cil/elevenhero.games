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
import { useRef, useState, MouseEvent } from 'react';
import { setCredentials } from '@/features/user/userSlice';
import AuthOutlet from './AuthOutlet';
import { useAuthMutation, useSendVerificationEmailMutation } from '@/features/user/userApiSlice';
import DefaultModal from '@/components/Modals/DefaultModal';

function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useAuthMutation();
  const [sendActivationEmail, { isLoading: verificationLoading }] = useSendVerificationEmailMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [modalText, setModalText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const loginHandler = async (e: any) => {
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
          } else if (error?.data?.message?.includes('verify')) {
            setIsModalOpen(() => {
              setModalText("Your account hasn't been verified yet. Please verify your account to continue.");
              return true;
            });
          } else {
            toast.error(error?.data?.message);
          }
        });
    }
  };

  const handleVerify = () => {
    sendActivationEmail(emailRef.current?.value?.trim())
      .unwrap()
      .then(() => {
        toast.success("We've sent you an email. Please check your inbox and verify your account.");
      })
      .catch((e: Error) => {
        console.log(e);
      })
      .finally(() => {
        setIsModalOpen(null);
      });
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
    </AuthOutlet>
  );
}

export default Login;
