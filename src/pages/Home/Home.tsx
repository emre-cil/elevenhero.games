import { Button, Container, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { selectAccessToken, logout } from '../../features/user/userSlice';
import AppSlider from '../../components/Banner/Banner';
import { useLazyLogoutQuery } from '../../features/user/userApiSlice';
// import { useGetCardWithIdQuery } from '../../features/user/userApiSlice';

function Home() {
  const dispatch = useDispatch();
  const [logoutF] = useLazyLogoutQuery();

  const token = useSelector(selectAccessToken);

  const logoutHandler = () => {
    dispatch(logout());
    logoutF()
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
