import { useAppSelector } from '@/app/store';
import CreateTournamentCard from '@/components/Cards/CreateTournamentCard';
import TournamentCard from '@/components/Cards/TournamentCard';
import { useGetActiveTournamentsQuery } from '@/features/tournamentApiSlice';
import { Container, Grid, Stack, Typography } from '@mui/material';

function Tournament() {
  const { data: tournaments, isLoading } = useGetActiveTournamentsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const user = useAppSelector((state) => state.user.user) as any;
  console.log(tournaments);
  return (
    <Container sx={{ py: 3 }}>
      <Stack gap={2}>
        <CreateTournamentCard />
        <Grid container>
          {tournaments?.live?.map((tournament: any) => (
            <TournamentCard
              key={tournament?._id}
              tournament={tournament}
              owner={tournament?.player1?._id === user?.id}
            />
          ))}
          {tournaments?.resulted?.map((tournament: any) => (
            <TournamentCard
              key={tournament?._id}
              tournament={tournament}
              owner={tournament?.player1?._id === user?.id}
            />
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}
export default Tournament;
