import React, { useState } from 'react';
import { Container, Stack, Typography, styled } from '@mui/material';
import LeaderBoardCard from '../../components/Cards/LeaderBoardCard';

function Leaderboard() {
  // monthly 1, all time 2
  const [selectedBoard, setSelectedBoard] = useState(1);

  const scores = [
    {
      name: 'John Doe',
      score: 100,
    },
    {
      name: 'John Doe',
      score: 100,
    },
    {
      name: 'John Doe',
      score: 100,
    },
    {
      name: 'John Doe',
      score: 100,
    },
    {
      name: 'John Doe',
      score: 100,
    },
    {
      name: 'John Doe',
      score: 100,
    },
    {
      name: 'John Doe',
      score: 100,
    },
    {
      name: 'John Doe',
      score: 100,
    },
    {
      name: 'John Doe',
      score: 100,
    },
    {
      name: 'John Doe',
      score: 100,
    },
  ];

  return (
    <Container
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
        {scores.map((score, index) => (
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              borderRadius: '14px',
              backgroundColor: 'Ink.Base',
              p: '1rem',
            }}
            key={index}
          >
            <Typography variant="body2" component="h3" color="white">
              {index + 1}
            </Typography>
            <Typography variant="body2" component="h3" color="white">
              {score.name}
            </Typography>
            <Typography variant="body2" component="h3" color="white">
              {score.score}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Container>
  );
}

export default Leaderboard;
