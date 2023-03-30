import { Button, Container, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/store';
import React from 'react';
import { logout } from '../../features/user/userSlice';
import AppSlider from '../../components/Banner/Banner';
import { useLazyLogoutQuery } from '../../features/user/userApiSlice';
// import { useGetCardWithIdQuery } from '../../features/user/userApiSlice';

function Home() {
  const dispatch = useAppDispatch();
  const [logoutF] = useLazyLogoutQuery();

  const token = useAppSelector((state) => state.user.accessToken);

  const logoutHandler = () => {
    dispatch(logout());
    logoutF(undefined)
      .unwrap()
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <>
      <AppSlider />
      <Container
        maxWidth="xl"
        sx={{
          p: '122px 40px',
          pt: 0,
        }}
      >
        <Typography variant="subtitle1" color="black" sx={{ mb: 3, fontSize: '13px', wordBreak: 'break-all' }}>
          {token}
        </Typography>
        <Button onClick={logoutHandler}>logout</Button>
      </Container>
    </>
  );
}

export default Home;
