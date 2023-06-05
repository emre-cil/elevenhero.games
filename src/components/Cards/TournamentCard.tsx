import { Button, Grid, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useCancelTournamentMutation, useJoinTournamentMutation } from '@/features/tournamentApiSlice';
import { toast } from 'react-hot-toast';
interface TournamentCardProps {
  tournament: any;
  owner: boolean;
  userId: any;
  resulted?: boolean;
}

const TournamentCard: FC<TournamentCardProps> = ({ tournament, owner, userId, resulted }) => {
  const [cancelTournament, { isLoading: cancelLoading }] = useCancelTournamentMutation();
  const [joinTournament, { isLoading: joinLoading }] = useJoinTournamentMutation();
  const handleOperation = () => {
    if (owner) {
      // cancel tournament
      cancelTournament(tournament?._id)
        .then((res) => {
          toast.success('Tournament canceled');
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } else {
      // join tournament
      joinTournament(tournament?._id)
        .then((res: any) => {
          if (res?.error?.data?.message) {
            toast.error(res.error.data.message);
            return;
          }
          toast.success('Tournament joined');
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  const userArea = (username: any) => {
    return (
      <Stack
        alignItems="center"
        sx={{
          width: '45%',
        }}
        gap={1}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            boxShadow: 1,
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            backgroundColor: 'grey.500',
            fontSize: '1.5rem',
          }}
        >
          {username?.charAt(0).toUpperCase()}
        </Stack>
        <Typography textAlign="center" variant="body1">
          {username ? username : 'waiting...'}
        </Typography>
      </Stack>
    );
  };
  return (
    <Grid item xs={12} sm={6} lg={4} xl={3}>
      <Stack
        sx={{
          width: '100%',
          p: 2,
          boxShadow: 1,
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          minHeight: '150px',
          border: resulted
            ? tournament.status === 1
              ? '2px solid orange'
              : tournament?.winner === 0
              ? '2px solid #3e3e3e'
              : tournament?.winner === -1 && tournament?.player1?._id === userId
              ? '2px solid green'
              : tournament?.winner === 1 && tournament?.player2?._id === userId
              ? '2px solid green'
              : '2px solid red'
            : 'none',

          animation: tournament.status === 1 ? 'pulse 2s infinite' : 'none',
          '@keyframes pulse': {
            '0%': {
              boxShadow: '0 0 0 0 rgba(238, 180, 6, 0.8)',
            },
            '50%': {
              boxShadow: '0 0 0 10px rgba(0, 0, 0, 0)',
            },
            '100%': {
              boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
            },
          },
        }}
        gap={2}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {userArea(tournament?.player1?.username)}
          <Typography
            variant="h4"
            textAlign="center"
            sx={{
              width: '120px',
              mb: 3,
            }}
          >
            {tournament?.p1Goals?.length}
            {' - '}
            {tournament?.p2Goals?.length}
          </Typography>

          {userArea(tournament?.player2?.username)}
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
          <Typography variant="body1" textAlign="center">
            Entry Price
            <br />
            {tournament?.amount}
          </Typography>
          {tournament?.player2 ? (
            <Typography variant="body1" textAlign="center">
              {tournament.status === 1
                ? `Live ${
                    // remove started at to current date
                    Math.ceil((new Date().getTime() - new Date(tournament?.startedAt).getTime()) / 1000 / 60)
                  }'`
                : tournament?.winner === 0
                ? 'Draw'
                : tournament?.winner === -1
                ? tournament?.player1?.username
                : tournament?.player2?.username}
            </Typography>
          ) : (
            <Button variant="contained" onClick={handleOperation}>
              {owner ? 'Cancel' : 'Join'}
            </Button>
          )}
        </Stack>
      </Stack>
    </Grid>
  );
};

export default TournamentCard;
