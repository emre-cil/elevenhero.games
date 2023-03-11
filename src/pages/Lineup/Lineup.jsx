/* eslint-disable react/no-array-index-key */
import { Box, Container, Grid, MenuItem, Pagination, Stack, TextField } from '@mui/material';
import React, { useState, useMemo, useCallback } from 'react';
import { DndContext } from '@dnd-kit/core';
import lineupImg from '../../assets/Images/lineup.webp';
import TestImg from '../../assets/Images/testImg.webp';
import LineUpEmpty from '../../components/Cards/LineUpEmpty';
import TestLineUpCard from '../../components/Cards/TestLineUpCard';
import formations from '../../data/formations';

function Lineup() {
  // 11 players 4-4-2 img 500x500 cards 50x75
  const [selectedFormation, setSelectedFormation] = useState(formations[0]);
  const [page, setPage] = useState(1);
  const playerPositions = ['ALL', 'GK', 'LB', 'CB', 'RB', 'LM', 'CM', 'RM', 'ST', 'CAM', 'LW', 'RW', 'CDM'];
  // top 5 most used formations

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

  const [unSelectedPlayers, setUnSelectedPlayers] = useState(players);

  const setAsUnselected = (id) => {
    // if unselected contains the player
    if (unSelectedPlayers.find((p) => p.id === id) !== undefined) return;
    // update the unselected players
    setUnSelectedPlayers((prev) => {
      const player = players.find((p) => p.id === id);
      if (player) {
        return [...prev, player];
      }
      return prev;
    });
    // remove the player from the dropped
    setSelectedFormation((prev) => {
      const NewDropped = prev.positions.map((position) => {
        if (position.player && position.player.id === id) {
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

  const handleDragEnd = (event) => {
    if (event.over) {
      setUnSelectedPlayers((prev) => {
        let NewUnselecteds = prev;
        const isPlayerUnselected = prev.find((p) => p.id === event.active.id) !== undefined;
        const destination = selectedFormation.positions.find((p) => p.id === event.over.id);
        setSelectedFormation((x) => {
          const NewDropped = x.positions.map((position) => {
            if (position.player && position.player.id === event.active.id) {
              return {
                ...position,
                player: destination.player || null,
              };
            }
            // if the position is the same as the one
            if (position.id === event.over.id && isPlayerUnselected) {
              // if the position is empty not empty
              NewUnselecteds = position.player
                ? prev.filter((p) => p.id !== event.active.id).concat(position.player)
                : prev.filter((p) => p.id !== event.active.id);
              return {
                ...position,
                player: players.find((p) => p.id === event.active.id),
              };
            }
            // inside movement
            if (position.id === event.over.id && !isPlayerUnselected) {
              return {
                ...position,
                player: players.find((p) => p.id === event.active.id),
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
            alignItems="center"
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
            {selectedFormation.positions?.map((position, idx) => (
              <LineUpEmpty key={position.id} x={position.x} y={position.y} id={position.id} name={position.name}>
                {position.player ? (
                  <TestLineUpCard
                    located
                    player={position.player}
                    onDoubleClick={() => setAsUnselected(position.player.id)}
                  />
                ) : (
                  <span>{position.name}</span>
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
                <Box>{position}</Box>
              ))}
            </Stack>
            <Grid container>
              {unSelectedPlayers.slice((page - 1) * 9, page * 9).map((player) => (
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
