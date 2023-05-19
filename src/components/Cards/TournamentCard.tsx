import { Button, Grid, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCancelTournamentMutation, useJoinTournamentMutation } from '@/features/tournamentApiSlice';
import { toast } from 'react-hot-toast';
interface TournamentCardProps {
  tournament: any;
  owner: boolean;
}

const TournamentCard: FC<TournamentCardProps> = ({ tournament, owner }) => {
  const [cancelTournament, { isLoading: cancelLoading }] = useCancelTournamentMutation();
  const [joinTournament, { isLoading: joinLoading }] = useJoinTournamentMutation();

  const handleOperation = () => {
    if (owner) {
      // cancel tournament
      cancelTournament(tournament?._id)
        .then((res) => {
          console.log(res);
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
          console.log('burda');
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
    <Grid
      item
      xs={12}
      md={6}
      lg={4}
      sx={{
        p: 2,
        boxShadow: 1,
        borderRadius: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        minHeight: '150px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Stack
        sx={{
          width: '100%',
        }}
        gap={2}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {userArea(tournament?.player1?.username)}
          <RemoveIcon sx={{ fontSize: '2rem' }} />
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
                    Math.floor((new Date().getTime() - new Date(tournament?.startedAt).getTime()) / 1000 / 60)
                  }`
                : 'Resulted'}
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
