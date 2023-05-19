import { Grid } from '@mui/material';
import React, { FC } from 'react';

interface TournamentCardProps {
  tournament: any;
}

const TournamentCard: FC<TournamentCardProps> = ({ tournament }) => {
  return (
    <Grid item>
      <h1>{tournament.player1.username}</h1>
    </Grid>
  );
};

export default TournamentCard;
