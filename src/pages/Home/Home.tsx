import TournamentCard from '@/components/Cards/TournamentCard';
import { useGetLatestTournamentQuery } from '@/features/tournamentApiSlice';
import { Container } from '@mui/material';
import { useAppSelector } from '@/app/store';

function Home() {
  const { data: tournament, isLoading } = useGetLatestTournamentQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });
  const user = useAppSelector((state) => state.user.user) as any;

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          p: '122px 40px',
          pt: 0,
        }}
      >
        {tournament && (
          <TournamentCard
            key={tournament[0]?._id}
            tournament={tournament[0]}
            owner={tournament[0]?.player1?._id === user?.id}
            userId={user?.id}
          />
        )}
      </Container>
    </>
  );
}

export default Home;
