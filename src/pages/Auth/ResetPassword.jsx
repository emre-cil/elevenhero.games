import { TextField, Button, CircularProgress } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import AuthOutlet from './AuthOutlet';

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const isLoading = false;
  // const [newPassword, { isLoading }] = useNewPasswordMutation();
  const handleRequest = async () => {
    const pwd = passwordRef.current.value.replace(/\s+/g, '');
    const pwdConf = confirmPasswordRef.current.value.replace(/\s+/g, '');
    if (pwd === '') {
      toast.error('Please enter your password.');
      passwordRef.current.focus();
    } else if (pwdConf === '') {
      toast.error('Please confirm your password.');
      confirmPasswordRef.current.focus();
    } else if (pwd !== pwdConf) {
      toast.error('The passwords do not match.');
      passwordRef.current.focus();
    } else if (pwd.length < 6) {
      toast.error('The password must be at least 6 characters long.');
      passwordRef.current.focus();
    } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/.test(pwd)) {
      toast.error('The password must contain at least one uppercase letter, one lowercase letter, and one number.');
      passwordRef.current.focus();
    } else {
      // newPassword({
      //   ForgotToken: searchParams.get('GUID'),
      //   NewPassword: pwd,
      //   ReNewPassword: pwdConf,
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
      //       toast.error('An error occurred. Please try again later.');
      //     }
      //   });
    }
  };

  useEffect(() => {
    passwordRef.current.focus();
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
