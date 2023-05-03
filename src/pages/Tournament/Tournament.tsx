import { Container, Stack, Typography } from '@mui/material';

function Tournament() {
  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Tournament
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Typography variant="h6" component="h2" gutterBottom>
          X
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          VS
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Y
        </Typography>
      </Stack>
    </Container>
  );
}
export default Tournament;
