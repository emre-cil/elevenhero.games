import { useAppSelector } from '@/app/store';
import CreateTournamentCard from '@/components/Cards/CreateTournamentCard';
import TournamentCard from '@/components/Cards/TournamentCard';
import Loading from '@/components/Loading';
import SectionHeader from '@/components/SectionHeader';
import { useGetActiveTournamentsQuery } from '@/features/tournamentApiSlice';
import { Container, Grid, Stack } from '@mui/material';

function Tournament() {
  const { data: tournaments, isLoading } = useGetActiveTournamentsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });
  const user = useAppSelector((state) => state.user.user) as any;
  return (
    <Container sx={{ py: 3 }}>
      <Stack gap={2.5}>
        <CreateTournamentCard />
        {isLoading ? (
          <Loading loading={isLoading} />
        ) : (
          <>
            {tournaments?.live?.length > 0 && (
              <>
                <SectionHeader title="Waiting" />
                <Grid container spacing={2.5}>
                  {tournaments.live.map((tournament: any) => (
                    <TournamentCard
                      key={tournament?._id}
                      tournament={tournament}
                      owner={tournament?.player1?._id === user?.id}
                      userId={user?.id}
                    />
                  ))}
                </Grid>
              </>
            )}
            {tournaments?.resulted?.length > 0 && (
              <>
                <SectionHeader title="My Tournaments" />
                <Grid container spacing={2.5}>
                  {tournaments.resulted.map((tournament: any) => (
                    <TournamentCard
                      key={tournament?._id}
                      tournament={tournament}
                      owner={tournament?.player1?._id === user?.id}
                      userId={user?.id}
                      resulted
                    />
                  ))}
                </Grid>
              </>
            )}
          </>
        )}
      </Stack>
    </Container>
  );
}
export default Tournament;
