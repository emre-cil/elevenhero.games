import CreateTournamentCard from '@/components/Cards/CreateTournamentCard';
import TournamentCard from '@/components/Cards/TournamentCard';
import { useGetActiveTournamentsQuery } from '@/features/tournamentApiSlice';
import { Container, Grid, Stack, Typography } from '@mui/material';

function Tournament() {
  const { data: tournaments, isLoading } = useGetActiveTournamentsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  console.log(tournaments);
  return (
    <Container sx={{ py: 3 }}>
      <CreateTournamentCard a={null} />
      <Grid container>
        {tournaments?.live?.map((tournament: any) => (
          <TournamentCard key={tournament?._id} tournament={tournament} />
        ))}
      </Grid>
    </Container>
  );
}
export default Tournament;
