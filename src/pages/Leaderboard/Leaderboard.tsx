import { useState } from 'react';
import { Container, Stack, Typography } from '@mui/material';
import LeaderBoardCard from '@/components/Cards/LeaderBoardCard';
import { useGetAllTimeLeaderboardQuery, useGetMonthlyLeaderboardQuery } from '@/features/common/commonApiSlice';

type score = {
  username: string;
  monthlyScore?: number;
  totalScore?: number;
};
function Leaderboard() {
  // monthly 1, all time 2
  const [selectedBoard, setSelectedBoard] = useState(1);
  const { data: monthlyScores } = useGetMonthlyLeaderboardQuery(undefined, { skip: selectedBoard !== 1 });
  const { data: allTimeScores } = useGetAllTimeLeaderboardQuery(undefined, { skip: selectedBoard !== 2 });
  console.log(monthlyScores, allTimeScores);

  const ScoreItem = (score: score, index: number) => (
    <Stack
      direction="row"
      sx={{
        justifyContent: 'space-between',
        borderRadius: '14px',
        backgroundColor: 'Ink.Base',
        p: '1rem',
        '&:nth-of-type(1)': {
          background: 'linear-gradient(90deg, #ffb900 0%, #E3D294 100%)',
          h3: {
            color: 'grey.100',
          },
        },
        '&:nth-of-type(2)': {
          background: 'linear-gradient(90deg, #69797e 0%, #DFDFDF 100%)',
          h3: {
            color: 'grey.100',
          },
        },
        '&:nth-of-type(3)': {
          background: 'linear-gradient(90deg, #847545 0%, #E8C8A9 100%)',
          h3: {
            color: 'grey.100',
          },
        },
        h3: {
          fontWeight: 'bold',
          fontSize: '1rem',
        },
      }}
    >
      <Typography variant="body2" component="h3" color="white">
        {index + 1}
      </Typography>
      <Typography variant="body2" component="h3" color="white">
        {score.username}
      </Typography>
      <Typography variant="body2" component="h3" color="white">
        {selectedBoard === 1 ? score.monthlyScore : score.totalScore}
      </Typography>
    </Stack>
  );
  return (
    <Container
      maxWidth="sm"
      sx={{
        py: 3,
      }}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          borderRadius: '14px',
          backgroundColor: 'Ink.Base',
          mx: 'auto',
          mb: '1rem',
          width: { xs: '90%', sm: '75%', md: '50%', lg: '300px' },
          height: '50px',
          position: 'relative',
          overflow: 'hidden',
          h6: {
            width: '50%',
            textAlign: 'center',
            zIndex: '2',
            userSelect: 'none',
            cursor: 'pointer',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '5px',
            left: '5px',
            width: 'calc(50% - 5px)',
            height: '40px',
            backgroundColor: 'Ink.Light',
            borderRadius: '10px',
            transform: selectedBoard === 1 ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.3s ease-in-out',
          },
        }}
      >
        <Typography variant="h6" onClick={() => setSelectedBoard(1)}>
          Monthly
        </Typography>
        <Typography variant="h6" onClick={() => setSelectedBoard(2)}>
          All Time
        </Typography>
      </Stack>
      <Stack direction="row" gap={2} justifyContent="center" sx={{ mb: '1rem' }}>
        <LeaderBoardCard color="Card.Silver" mt={2} />
        <LeaderBoardCard color="Card.Gold" />
        <LeaderBoardCard color="Card.Bronze" mt={2.25} />
      </Stack>
      <Stack gap={2}>
        {selectedBoard === 1
          ? monthlyScores?.map((score: score, index: number) => ScoreItem(score, index))
          : allTimeScores?.map((score: score, index: number) => ScoreItem(score, index))}
      </Stack>
    </Container>
  );
}

export default Leaderboard;
