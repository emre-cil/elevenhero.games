/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-array-index-key */
import { Box, Container, Grid, IconButton, MenuItem, Pagination, Stack, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import lineupImg from '@/assets/Images/lineup.webp';
import TestImg from '@/assets/Images/testImg.webp';
import LineUpEmpty from '@/components/Cards/LineUpEmpty';
import TestLineUpCard from '@/components/Cards/TestLineUpCard';
import formations from '@/data/formations';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useLazyGetFormationQuery } from '@/features/formationApiSlice';

const players = [
  {
    id: 2,
    name: 'GK',
    img: TestImg,
  },
  {
    id: 212,
    name: 'LB',
    img: TestImg,
  },
  {
    id: 32,
    name: 'CB',
    img: TestImg,
  },
  {
    id: 44,
    name: 'CB',
    img: TestImg,
  },
  {
    id: 11,
    name: 'RB',

    img: TestImg,
  },
  {
    id: 623,
    name: 'LM',
    img: TestImg,
  },
  {
    id: 723,
    name: 'CM',
    img: TestImg,
  },
  {
    id: 844,
    name: 'CM',
    img: TestImg,
  },
  {
    id: 923,
    name: 'RM',
    img: TestImg,
  },
  {
    id: 102,
    name: 'ST',
    img: TestImg,
  },
  {
    id: 112,
    name: 'ST',
    img: TestImg,
  },
];

function Lineup() {
  // 11 players 4-4-2 img 500x500 cards 50x75
  const [selectedFormation, setSelectedFormation] = useState<any>(formations[0]);
  const [page, setPage] = useState(1);
  const playerPositions = ['ALL', 'GK', 'LB', 'CB', 'RB', 'LM', 'CM', 'RM', 'ST', 'CAM', 'LW', 'RW', 'CDM'];
  const [unSelectedPlayers, setUnSelectedPlayers] = useState([]);

  const [getFormation, { data, isLoading, isError }] = useLazyGetFormationQuery();
  // top 5 most used formations

  // useEffect(() => {
  //   setUnSelectedPlayers(players);
  // }, [selectedFormation?.name]);

  useEffect(() => {
    getFormation(undefined)
      .then((res) => {
        setUnSelectedPlayers(res?.data?.unselectedPlayers || []);
      })
      .catch((err) => {
        alert(err?.message || 'Error');
      });
  }, []);

  function LineTactics({ line }: any) {
    return (
      <Stack direction="row" alignItems="center">
        <Typography variant="body2" sx={{ minWidth: '5rem' }}>
          {line}
        </Typography>
        <IconButton sx={{ color: 'green' }}>
          <ArrowUpwardIcon />
        </IconButton>
        <IconButton>
          <CenterFocusStrongIcon />
        </IconButton>
        <IconButton>
          <ArrowDownwardIcon />
        </IconButton>
      </Stack>
    );
  }
  const setAsUnselected = (id: any) => {
    // if unselected contains the player
    if (unSelectedPlayers.find((p: any) => p.id === id) !== undefined) return;
    // update the unselected players
    setUnSelectedPlayers((prev: any) => {
      const player = players.find((p) => p.id === id);
      if (player) {
        return [...prev, player];
      }
      return prev;
    });
    // remove the player from the dropped
    setSelectedFormation((prev: any) => {
      const NewDropped = prev.positions.map((position: any) => {
        if (position?.player && position.player.id === id) {
          return {
            ...position,
            player: null,
          };
        }
        return position;
      });
      return {
        ...prev,
        positions: NewDropped,
      };
    });
  };

  const handleDragEnd = (event: any) => {
    if (event.over) {
      setUnSelectedPlayers((prev) => {
        let NewUnselecteds = prev;
        const isPlayerUnselected = prev.find((p: any) => p.id === event.active.id) !== undefined;
        const destination = selectedFormation.positions.find((p: any) => p.id === event.over.id);
        setSelectedFormation((x: any) => {
          const NewDropped = x.positions.map((position: any) => {
            if (position.player && position.player.id === event.active.id) {
              return {
                ...position,
                player: destination?.player || null,
              };
            }
            // if the position is the same as the one
            if (position.id === event.over.id && isPlayerUnselected) {
              // if the position is empty not empty
              NewUnselecteds = position.player
                ? prev.filter((p: any) => p.id !== event.active.id).concat(position.player)
                : prev.filter((p: any) => p.id !== event.active.id);
              return {
                ...position,
                player: players.find((p: any) => p.id === event.active.id),
              };
            }
            // inside movement
            if (position.id === event.over.id && !isPlayerUnselected) {
              return {
                ...position,
                player: players.find((p: any) => p.id === event.active.id),
              };
            }

            return position;
          });

          return {
            ...x,
            positions: NewDropped,
          };
        });

        return NewUnselecteds;
      });
    } else {
      setAsUnselected(event.active.id);
    }
  };

  return (
    <Container sx={{ py: 3 }}>
      <DndContext onDragEnd={handleDragEnd}>
        <Stack
          gap={3}
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            mb: 3,
          }}
        >
          <Stack
            // left
            sx={{
              flex: 3,
              borderRadius: '5px',
              border: '1px solid gray',
              p: 2,
            }}
            gap={2}
          >
            <Box
              sx={{
                p: 2,
                backgroundColor: 'purple',
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mx: 'auto',
              }}
            >
              <Box
                sx={{
                  border: '5px solid white',
                  borderRadius: '50%',
                  minWidth: '50px',
                  minHeight: '50px',
                  textAlign: 'center',
                  pt: '8px',
                }}
              >
                90
              </Box>
            </Box>
            <Box
              sx={{
                background: 'linear-gradient(90deg, #ff0000 0%, #ff8800 33%, #fbff00 66%, #00ff00 100%)',
                width: '100%',
                height: '10px',
                borderRadius: '5px',
                mb: 2,
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  top: '-50%',
                  width: '4px',
                  height: '200%',
                  backgroundColor: 'white',
                  left: '83%',
                  boxShadow: 10,
                  borderRadius: '6px',
                },

                '&:before': {
                  content: '"83"',
                  position: 'absolute',
                  top: '150%',
                  width: '5px',
                  height: '200%',
                  left: '81%',
                  boxShadow: 10,
                  borderRadius: '6px',
                },
              }}
            />
            <TextField
              fullWidth
              select
              label="Formation"
              value={selectedFormation.name}
              onChange={(e) => {
                setSelectedFormation(
                  formations.find((formation) => formation.name === e.target.value) ?? formations[0],
                );
              }}
            >
              {formations.map((option) => (
                <MenuItem key={option.name} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <Stack>
              <Typography variant="h6" textAlign="center">
                Line Tactics
              </Typography>
              <LineTactics line="Upper Line" />
              <LineTactics line="Middle Line" />
              <LineTactics line="Lower Line" />
            </Stack>
          </Stack>
          <Box
            sx={{
              mx: 'auto',
              width: 'fit-content',
              height: 'fit-content',
              position: 'relative',
              '#grass': {
                width: { xs: '100%', sm: '300px', md: '400px', lg: '450px', xl: '500px' },
                zIndex: -1,
                userSelect: 'none',
              },
            }}
          >
            <img id="grass" src={lineupImg} alt="" />
            {selectedFormation.positions?.map((position: any) => (
              <LineUpEmpty key={position.id} x={position.x} y={position.y} id={position.id} name={position.name}>
                {position.player ? (
                  <TestLineUpCard player={position.player} onDoubleClick={() => setAsUnselected(position.player.id)} />
                ) : (
                  <Box
                    sx={{
                      width: '100%',
                      textAlign: 'center',
                      color: 'white',
                      opacity: 0.9,
                      mt: '45%',
                    }}
                  >
                    {position.name}
                  </Box>
                )}
              </LineUpEmpty>
            ))}
          </Box>
          <Stack
            sx={{
              flex: 3,
              borderRadius: '5px',
              border: '1px solid gray',
              p: 2,
            }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack
              direction="row"
              gap={1}
              flexWrap="wrap"
              sx={{
                borderBottom: '1px solid gray',
                pb: 1,
                mb: 1,
              }}
            >
              {playerPositions.map((position) => (
                <Box key={position}>{position}</Box>
              ))}
            </Stack>
            <Grid container>
              {unSelectedPlayers?.slice((page - 1) * 9, page * 9)?.map((player: any) => (
                <TestLineUpCard key={player.id} player={player} />
              ))}
            </Grid>
            <Pagination count={Math.ceil(players.length / 9)} page={page} onChange={(e, value) => setPage(value)} />
          </Stack>
        </Stack>
      </DndContext>
    </Container>
  );
}

export default Lineup;
