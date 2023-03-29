import { Container, Stack } from '@mui/material';
import React from 'react';
import LeaderBoardCard from '../../components/Cards/LeaderBoardCard';

function Leaderboard() {
  return <Container>
    <Stack direction="row" gap={2} sx={{

}}>
  <LeaderBoardCard color="Card.Silver"/>
  <LeaderBoardCard color="Card.Gold"/>
  <LeaderBoardCard color="Card.Bronze"/>
</Stack>
  </Container>;
}

export default Leaderboard;
