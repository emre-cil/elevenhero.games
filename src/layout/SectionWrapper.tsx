import { Stack, Typography, Grid, Pagination, Box } from '@mui/material';
import { FC, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Filter from '@/components/Filter';
import PlayerCard from '@/components/Cards/PlayerCard';

type SectionWrapperProps = {
  title: string;
  sectionId: string;
  setSelected: any;
  handleOperation: any;
};

const SectionWrapper: FC<SectionWrapperProps> = ({ title, sectionId, setSelected, handleOperation }) => {
  const multiData = [
    {
      id: '0',
      name: 'BEYREUTHER',
      photoUrl: 'https://cdn.vole.io/share/99/b9ab636a-03a9-49c6-9349-7f508378c9cc.png',
      price: 10,
      team: 'Viktoria Berlin',
      position: 'Defender',
      cardType: 'Bronze',
      attributes: {
        pace: '72',
        shooting: '41',
        passing: '50',
        dribbling: '56',
        defending: '57',
        physical: '58',
      },
    },
    {
      id: '1',
      name: 'BOUDJEMAA',
      photoUrl: 'https://cdn.vole.io/share/99/e72257f9-4523-4e81-8b39-a36a1414ceed.png',
      price: 10,
      team: 'Hatayspor',
      position: 'Midfielder',
      cardType: 'Bronze',
      attributes: {
        pace: '71',
        shooting: '41',
        passing: '59',
        dribbling: '67',
        defending: '61',
        physical: '67',
      },
    },
    {
      id: '2',
      name: 'ÇIPE',
      photoUrl: 'https://cdn.vole.io/share/99/97b2769a-43d9-4173-a0ea-ff9c97a7ea7e.png',
      price: 10,
      team: 'Galatasaray',
      position: 'Goalkeeper',
      cardType: 'Bronze',
      attributes: {
        diving: '62',
        handling: '65',
        kicking: '64',
        reflexes: '62',
        speed: '45',
        positioning: '65',
      },
    },
    {
      id: '3',
      name: 'JÄNICKE',
      photoUrl: 'https://cdn.vole.io/share/99/f2d1b594-76ed-46c9-847c-937fe1cac7f4.png',
      price: 10,
      team: 'Saarbrücken',
      position: 'Midfielder',
      cardType: 'Bronze',
      attributes: {
        pace: '74',
        shooting: '57',
        passing: '65',
        dribbling: '67',
        defending: '55',
        physical: '65',
      },
    },
    {
      id: '4',
      name: 'LEE SOO BIN',
      photoUrl: 'https://cdn.vole.io/share/99/2385ddcd-dda8-4a60-a6be-9eb51b172664.png',
      price: 10,
      team: 'Pohang Steelers',
      position: 'Midfielder',
      cardType: 'Bronze',
      attributes: {
        pace: '57',
        shooting: '48',
        passing: '58',
        dribbling: '65',
        defending: '54',
        physical: '56',
      },
    },
    {
      id: '5',
      name: 'MEHMETI',
      photoUrl: 'https://cdn.vole.io/share/99/1c65b353-00da-4a20-9e19-45b2e59af300.png',
      price: 10,
      team: 'Wycombe',
      position: 'Midfielder',
      cardType: 'Bronze',
      attributes: {
        pace: '66',
        shooting: '50',
        passing: '57',
        dribbling: '70',
        defending: '53',
        physical: '61',
      },
    },
    {
      id: '6',
      name: 'NOWACZEK',
      photoUrl: 'https://cdn.vole.io/share/99/5ee6c748-d8c8-4c27-9e8f-88b716483284.png',
      price: 10,
      team: 'Gornik Leczna',
      position: 'Goalkeeper',
      cardType: 'Bronze',
      attributes: {
        diving: '55',
        handling: '54',
        kicking: '55',
        reflexes: '53',
        speed: '17',
        positioning: '52',
      },
    },
    {
      id: '7',
      name: 'NSONA',
      photoUrl: 'https://cdn.vole.io/share/99/5c7472b1-ce18-4643-a8a0-9f4067a794b5.png',
      price: 10,
      team: 'Hertha Berlin',
      position: 'Forward',
      cardType: 'Bronze',
      attributes: {
        pace: '87',
        shooting: '57',
        passing: '54',
        dribbling: '68',
        defending: '26',
        physical: '51',
      },
    },
    {
      id: '9',
      name: 'TOMASIK',
      photoUrl: 'https://cdn.vole.io/share/99/6ba36f6f-e065-4b6f-8236-44811647969a.png',
      price: 10,
      team: 'Wisla Plock',
      position: 'Defender',
      cardType: 'Bronze',
      attributes: {
        pace: '75',
        shooting: '56',
        passing: '61',
        dribbling: '59',
        defending: '58',
        physical: '68',
      },
    },
    {
      id: '10',
      name: 'VEKEMANS',
      photoUrl: 'https://cdn.vole.io/share/99/b0c2bb47-a888-4011-a039-a1a4c98fa707.png',
      price: 10,
      team: 'OH Leuven',
      position: 'Midfielder',
      cardType: 'Bronze',
      attributes: {
        pace: '76',
        shooting: '60',
        passing: '57',
        dribbling: '61',
        defending: '38',
        physical: '57',
      },
    },
    {
      id: '11',
      name: 'BOZANIC',
      photoUrl: 'https://cdn.vole.io/share/99/0dbb464c-a96c-4341-9106-e8cf6878d04c.png',
      price: 20,
      team: 'Central Coast',
      position: 'Midfielder',
      cardType: 'Silver',
      attributes: {
        pace: '66',
        shooting: '63',
        passing: '65',
        dribbling: '67',
        defending: '65',
        physical: '72',
      },
    },
    {
      id: '12',
      name: 'JOAN FEMENÍAS',
      photoUrl: 'https://cdn.vole.io/share/99/1f09c8ef-0684-479f-aad2-96fcfb0b9619.png',
      price: 20,
      team: 'Real Oviedo',
      position: 'Goalkeeper',
      cardType: 'Silver',
      attributes: {
        diving: '69',
        handling: '66',
        kicking: '51',
        reflexes: '73',
        speed: '25',
        positioning: '63',
      },
    },
    {
      id: '13',
      name: 'KEMPE',
      photoUrl: 'https://cdn.vole.io/share/99/5333a6b3-5fff-4efe-af0f-73c625872477.png',
      price: 20,
      team: 'Darmstad',
      position: 'Midfielder',
      cardType: 'Silver',
      attributes: {
        pace: '70',
        shooting: '70',
        passing: '75',
        dribbling: '71',
        defending: '42',
        physical: '70',
      },
    },
    {
      id: '15',
      name: 'KÖYBAŞI',
      photoUrl: 'https://cdn.vole.io/share/99/892fe560-370f-40bb-b21a-c31df2db60f7.png',
      price: 20,
      team: 'Trabzonspor',
      position: 'Defender',
      cardType: 'Silver',
      attributes: {
        pace: '75',
        shooting: '64',
        passing: '71',
        dribbling: '73',
        defending: '64',
        physical: '66',
      },
    },
    {
      id: '16',
      name: 'NILSSON',
      photoUrl: 'https://cdn.vole.io/share/99/33989ae0-46c0-43af-8f60-882d824c9a20.png',
      price: 20,
      team: 'Arm. Bielefeld',
      position: 'Defender',
      cardType: 'Silver',
      attributes: {
        pace: '60',
        shooting: '32',
        passing: '54',
        dribbling: '55',
        defending: '74',
        physical: '74',
      },
    },
    {
      id: '17',
      name: 'SANGARE',
      photoUrl: 'https://cdn.vole.io/share/99/06e895a8-16ea-4a92-9b71-34773e7cd16d.png',
      price: 20,
      team: 'Fenerbahçe',
      position: 'Defender',
      cardType: 'Silver',
      attributes: {
        pace: '88',
        shooting: '44',
        passing: '62',
        dribbling: '72',
        defending: '68',
        physical: '75',
      },
    },
    {
      id: '18',
      name: 'SERTEL',
      photoUrl: 'https://cdn.vole.io/share/99/979b4338-0e47-4f17-a98b-68bf1ddd4ef8.png',
      price: 20,
      team: 'Çaykur Rizespor',
      position: 'Defender',
      cardType: 'Silver',
      attributes: {
        pace: '67',
        shooting: '36',
        passing: '58',
        dribbling: '62',
        defending: '64',
        physical: '67',
      },
    },
    {
      id: '19',
      name: 'TOPAL',
      photoUrl: 'https://cdn.vole.io/share/99/5d4fe82d-1305-4ba0-8c04-474ed560364f.png',
      price: 20,
      team: 'Beşiktaş',
      position: 'Midfielder',
      cardType: 'Silver',
      attributes: {
        pace: '48',
        shooting: '64',
        passing: '62',
        dribbling: '65',
        defending: '75',
        physical: '74',
      },
    },
    {
      id: '20',
      name: 'TÖRE',
      photoUrl: 'https://cdn.vole.io/share/99/6b577f5a-ca85-4531-97f1-78b90106d677.png',
      price: 20,
      team: 'Beşiktaş',
      position: 'Forward',
      cardType: 'Silver',
      attributes: {
        pace: '81',
        shooting: '67',
        passing: '73',
        dribbling: '76',
        defending: '43',
        physical: '70',
      },
    },
    {
      id: '21',
      name: 'TURAN',
      photoUrl: 'https://cdn.vole.io/share/99/861cb216-a914-4208-92c0-cc2ff762643f.png',
      price: 20,
      team: 'Galatasaray',
      position: 'Midfielder',
      cardType: 'Silver',
      attributes: {
        pace: '46',
        shooting: '71',
        passing: '75',
        dribbling: '76',
        defending: '64',
        physical: '61',
      },
    },
    {
      id: '22',
      name: 'UĞURLU',
      photoUrl: 'https://cdn.vole.io/share/99/83869a5a-e055-401b-9111-3cfbc0b7d2e0.png',
      price: 20,
      team: 'Altay',
      position: 'Defender',
      cardType: 'Silver',
      attributes: {
        pace: '75',
        shooting: '47',
        passing: '67',
        dribbling: '66',
        defending: '61',
        physical: '61',
      },
    },
    {
      id: '23',
      name: 'BENZEMA',
      photoUrl: 'https://cdn.vole.io/share/99/e43aaef4-a2c6-4232-b106-2b438dc5cf8a.png',
      price: 30,
      team: 'Real Madrid',
      position: 'Forward',
      cardType: 'Gold',
      attributes: {
        pace: '76',
        shooting: '86',
        passing: '81',
        dribbling: '87',
        defending: '39',
        physical: '77',
      },
    },
    {
      id: '25',
      name: 'CRISTIANO RONALDO',
      photoUrl: 'https://cdn.vole.io/share/99/2c8cbd97-32e7-4871-8eb3-5fd2ac225517.png',
      price: 30,
      team: 'Manchester United',
      position: 'Forward',
      cardType: 'Gold',
      attributes: {
        pace: '87',
        shooting: '93',
        passing: '82',
        dribbling: '88',
        defending: '34',
        physical: '75',
      },
    },
    {
      id: '26',
      name: 'DE BRUYNE',
      photoUrl: 'https://cdn.vole.io/share/99/4c99944d-559e-46f4-be43-8aea82fcb7d6.png',
      price: 30,
      team: 'Manchester City',
      position: 'Midfielder',
      cardType: 'Gold',
      attributes: {
        pace: '76',
        shooting: '86',
        passing: '93',
        dribbling: '88',
        defending: '64',
        physical: '78',
      },
    },
    {
      id: '27',
      name: 'DE GEA',
      photoUrl: 'https://cdn.vole.io/share/99/82865181-b766-4cd5-8b32-248ae3d59ed9.png',
      price: 30,
      team: 'Manchester United',
      position: 'Goalkeeper',
      cardType: 'Gold',
      attributes: {
        diving: '86',
        handling: '79',
        kicking: '76',
        reflexes: '87',
        speed: '57',
        positioning: '79',
      },
    },
    {
      id: '28',
      name: 'FODEN',
      photoUrl: 'https://cdn.vole.io/share/99/d6391535-a61a-4c4e-8b51-d671261e7b3b.png',
      price: 30,
      team: 'Manchester City',
      position: 'Midfielder',
      cardType: 'Gold',
      attributes: {
        pace: '84',
        shooting: '78',
        passing: '80',
        dribbling: '87',
        defending: '56',
        physical: '57',
      },
    },
    {
      id: '29',
      name: 'HAALAND',
      photoUrl: 'https://cdn.vole.io/share/99/90294b30-d4fe-4e3f-9df4-9cd3f5a913ae.png',
      price: 30,
      team: 'Borussia Dortmund',
      position: 'Forward',
      cardType: 'Gold',
      attributes: {
        pace: '89',
        shooting: '91',
        passing: '65',
        dribbling: '80',
        defending: '45',
        physical: '88',
      },
    },
    {
      id: '30',
      name: 'KANTE',
      photoUrl: 'https://cdn.vole.io/share/99/1cd8d04d-7f91-4233-befc-d1ab41ed374c.png',
      price: 30,
      team: 'Chelsea',
      position: 'Midfielder',
      cardType: 'Gold',
      attributes: {
        pace: '78',
        shooting: '66',
        passing: '75',
        dribbling: '82',
        defending: '87',
        physical: '83',
      },
    },
    {
      id: '31',
      name: 'MAGUIRE',
      photoUrl: 'https://cdn.vole.io/share/99/f988ca47-b7e0-441b-aa74-c0eac7742aaa.png',
      price: 30,
      team: 'Manchester United',
      position: 'Defender',
      cardType: 'Gold',
      attributes: {
        pace: '50',
        shooting: '55',
        passing: '69',
        dribbling: '70',
        defending: '85',
        physical: '87',
      },
    },
    {
      id: '32',
      name: 'MBAPPÉ',
      photoUrl: 'https://cdn.vole.io/share/99/846e2715-70d0-4364-8de3-efef901ee238.png',
      price: 30,
      team: 'PSG',
      position: 'Forward',
      cardType: 'Gold',
      attributes: {
        pace: '97',
        shooting: '88',
        passing: '80',
        dribbling: '92',
        defending: '36',
        physical: '77',
      },
    },
    {
      id: '33',
      name: 'MESSI',
      photoUrl: 'https://cdn.vole.io/share/99/ff945053-623e-40cd-9489-b4290fce8b7f.png',
      price: 30,
      team: 'PSG',
      position: 'Forward',
      cardType: 'Gold',
      attributes: {
        pace: '85',
        shooting: '92',
        passing: '91',
        dribbling: '95',
        defending: '34',
        physical: '65',
      },
    },
    {
      id: '34',
      name: 'SALAH',
      photoUrl: 'https://cdn.vole.io/share/99/f3b53e0e-b944-4537-b7a7-1d4acc1ff954.png',
      price: 30,
      team: 'Liverpool',
      position: 'Forward',
      cardType: 'Gold',
      attributes: {
        pace: '90',
        shooting: '87',
        passing: '81',
        dribbling: '90',
        defending: '45',
        physical: '75',
      },
    },
    {
      id: '35',
      name: 'SERGIO RAMOS',
      photoUrl: 'https://cdn.vole.io/share/99/d93e486b-357c-4e05-b923-abd7202a5679.png',
      price: 30,
      team: 'PSG',
      position: 'Defender',
      cardType: 'Gold',
      attributes: {
        pace: '70',
        shooting: '70',
        passing: '76',
        dribbling: '74',
        defending: '88',
        physical: '84',
      },
    },
    {
      id: '36',
      name: 'VAN DIJK',
      photoUrl: 'https://cdn.vole.io/share/99/894f5e07-6ab5-49c7-83aa-facedd380333.png',
      price: 30,
      team: 'Liverpool',
      position: 'Defender',
      cardType: 'Gold',
      attributes: {
        pace: '78',
        shooting: '60',
        passing: '71',
        dribbling: '72',
        defending: '91',
        physical: '84',
      },
    },
  ];
  // // const initalData = useSelector(sectionId === 'market' ? selectMarketCards : selectUserCards);
  const [page, setPage] = useState(1);
  const [range, setRange] = useState([0, 30]);
  const [cardType, setCardType] = useState(null);
  const [position, setPosition] = useState(null);
  const [filterValues, setFilterValues] = useState({
    Gold: 0,
    Silver: 0,
    Bronze: 0,
    Goalkeeper: 0,
    Defender: 0,
    Midfielder: 0,
    Forward: 0,
  });
  const data = useMemo(() => {
    setFilterValues({
      Gold: multiData.filter((card) => card.cardType === 'Gold').length,
      Silver: multiData.filter((card) => card.cardType === 'Silver').length,
      Bronze: multiData.filter((card) => card.cardType === 'Bronze').length,
      Goalkeeper: multiData.filter((card) => card.position === 'Goalkeeper').length,
      Defender: multiData.filter((card) => card.position === 'Defender').length,
      Midfielder: multiData.filter((card) => card.position === 'Midfielder').length,
      Forward: multiData.filter((card) => card.position === 'Forward').length,
    });
    const filteredData = multiData.filter((card) => {
      if (cardType && cardType !== card.cardType) return false;
      if (position && position !== card.position) return false;
      if (range[0] > card.price || range[1] < card.price) return false;
      return true;
    });
    return filteredData;
  }, [cardType, position, range]);

  return (
    <Stack
      id={`section-${sectionId}`}
      gap={3}
      sx={{
        p: 3,
        width: '100%',
        scrollMarginTop: '146px',
        color: 'black',
      }}
    >
      <Typography color="black" variant="body2">
        {title}
      </Typography>
      <Stack
        direction={{
          xs: 'column',
          md: 'row',
        }}
      >
        <Box>
          <Filter
            range={range}
            cardType={cardType}
            position={position}
            setRange={setRange}
            setCardType={setCardType}
            setPosition={setPosition}
            filterValues={filterValues}
          />
        </Box>
        <Stack flex={1}>
          <Grid
            container
            spacing={3}
            ml={0}
            sx={{
              width: '100%',
              minHeight: data.length > 5 ? '792px' : 'auto',
            }}
          >
            {data.map(
              (card, id) =>
                id < page * 10 &&
                id >= (page - 1) * 10 && (
                  <Grid item xs={12} md={3} lg={2.4} key={card.id}>
                    <motion.div
                      key={card?.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.05 * (id % 10) }}
                    >
                      <PlayerCard
                        item={card}
                        section={sectionId}
                        onClick={setSelected}
                        handleOperation={handleOperation}
                      />
                    </motion.div>
                  </Grid>
                ),
            )}
          </Grid>
          {data.length > 10 && (
            <Pagination
              sx={{
                mx: 'auto',
                mb: 3,
                mt: 6,
                svg: {
                  fill: '#979C9E',
                },
                '& .Mui-disabled': {
                  display: 'none',
                },

                '& .MuiPaginationItem-page': {
                  backgroundColor: 'Sky.Base',
                  color: 'grey.900',
                },

                '& .Mui-selected': {
                  backgroundColor: '#E8282B!important',
                },
              }}
              count={Math.ceil(data.length / 10)}
              page={page}
              onChange={(e, value) => setPage(value)}
            />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SectionWrapper;
