/* eslint-disable react/no-array-index-key */
import { Box, Container, Stack } from '@mui/material';
import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import lineupImg from '../../assets/Images/lineup.webp';
import TestImg from '../../assets/Images/testImg.webp';
import LineUpEmpty from '../../components/Cards/LineUpEmpty';
import TestLineUpCard from '../../components/Cards/TestLineUpCard';

function Lineup() {
  // 11 players 4-4-2 img 500x500 cards 50x75
  const [isDropped, setIsDropped] = useState([
    { id: 0, name: 'GK', x: 1.75, y: 3.25, playerId: null },
    { id: 1, name: 'LB', x: 0.45, y: 2.1, playerId: null },
    { id: 2, name: 'CB', x: 1.35, y: 2.3, playerId: null },
    { id: 3, name: 'CB', x: 2.15, y: 2.3, playerId: null },
    { id: 4, name: 'RB', x: 3.05, y: 2.1, playerId: null },
    { id: 5, name: 'LM', x: 0.25, y: 1, playerId: null },
    { id: 6, name: 'CM', x: 1.25, y: 1, playerId: null },
    { id: 7, name: 'CM', x: 2.25, y: 1, playerId: null },
    { id: 8, name: 'RM', x: 3.25, y: 1, playerId: null },
    { id: 9, name: 'ST', x: 2.25, y: -0.1, playerId: null },
    { id: 10, name: 'ST', x: 1.25, y: -0.1, playerId: null },
  ]);

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
    setIsDropped((prev) => {
      const NewDropped = prev.map((position) => {
        if (position.player && position.player.id === id) {
          return {
            ...position,
            player: null,
          };
        }
        return position;
      });
      return NewDropped;
    });
  };

  const handleDragEnd = (event) => {
    if (event.over) {
      setUnSelectedPlayers((prev) => {
        let NewUnselecteds = prev;
        const isPlayerUnselected = prev.find((p) => p.id === event.active.id) !== undefined;
        const destination = isDropped.find((p) => p.id === event.over.id);
        setIsDropped((x) => {
          const NewDropped = x.map((position) => {
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

          return NewDropped;
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
            }}
          >
            LEFT ELEMENTS
          </Stack>
          <Box
            sx={{
              mx: 'auto',
              width: 'fit-content',
              height: 'fit-content',
              position: 'relative',
              order: { xs: 3, sm: 2 },

              '#grass': {
                width: { xs: '100%', sm: '300px', md: '400px', lg: '450px', xl: '500px' },
                zIndex: -1,
                userSelect: 'none',
              },
            }}
          >
            <img id="grass" src={lineupImg} alt="" />
            {isDropped.map((position, idx) => (
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
            // right
            sx={{
              flex: 3,
              borderRadius: '5px',
              border: '1px solid gray',
              order: { xs: 2, sm: 3 },
            }}
          >
            Right ELEMENTS
          </Stack>
        </Stack>
        <Stack
          // this one is going to be also droppable
          direction="row"
          gap={2}
          flexWrap="wrap"
          sx={{
            border: '1px solid black',
            borderRadius: '5px',
            padding: '5px',
            maxHeight: '675px',
            overflowY: 'auto',
            overflow: 'visible',
            zIndex: 1,
          }}
        >
          {unSelectedPlayers.map((player, idx) => (
            <TestLineUpCard key={player.id} player={player} />
          ))}
        </Stack>
      </DndContext>
    </Container>
  );
}

export default Lineup;
