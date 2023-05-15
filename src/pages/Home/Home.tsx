import AppSlider from '@/components/Banner';
import { Container } from '@mui/material';

function Home() {
  return (
    <>
      <AppSlider />
      <Container
        maxWidth="xl"
        sx={{
          p: '122px 40px',
          pt: 0,
        }}
      ></Container>
    </>
  );
}

export default Home;
