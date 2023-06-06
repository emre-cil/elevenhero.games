import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { toast } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import lineupImg from '@/assets/Images/lineup.webp';
import LineUpEmpty from '@/components/Cards/LineUpEmpty';
import TestLineUpCard from '@/components/Cards/TestLineUpCard';
import formations from '@/data/formations';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useLazyGetFormationQuery, useUpdateFormationMutation } from '@/features/formationApiSlice';

function Lineup() {
  const [selectedFormation, setSelectedFormation] = useState<any>([]);
  const [page, setPage] = useState(1);
  const playerPositions = ['ALL', 'GK', 'LB', 'CB', 'RB', 'LM', 'CM', 'RM', 'ST', 'CAM', 'LW', 'RW', 'CDM'];
  const [unSelectedPlayers, setUnSelectedPlayers] = useState([]);
  const [selectFormation, setSelectFormation] = useState('');
  const formationTypes = ['4-4-2', '4-3-3A', '4-3-3D', '4-2-3-1', '4-1-2-1-2', '3-4-3'];
  const [getFormation, { data }] = useLazyGetFormationQuery();
  const [updateFormation] = useUpdateFormationMutation();
  const [overall, setOverall] = useState(0);
  const [changedFlag, setChangedFlag] = useState(false);
  const [upperLine, setUpperLine] = useState<any>(0);
  const [middleLine, setMiddleLine] = useState<any>(0);
  const [lowerLine, setLowerLine] = useState<any>(0);
  useEffect(() => {
    if (selectedFormation?.length > 0) {
      setSelectedFormation((prev: any) => {
        const old = prev;

        const formation = formations[selectFormation];
        const newFormations = formation.map((position: any) => {
          return {
            ...position,
            player: old[position.id].player,
          };
        });

        return newFormations;
      });
    }
  }, [selectFormation]);

  useEffect(() => {
    if (selectedFormation?.length > 0) {
      setOverall(getOverall());
    }
  }, [selectedFormation]);

  useEffect(() => {
    getFormation(undefined)
      .then((res: any) => {
        if (res?.data?._id) {
          const data = res?.data;
          setSelectFormation(data?.formation);
          setSelectedFormation(() => {
            const formation = formations[data?.formation];
            const newFormations = formation.map((position: any) => {
              return {
                ...position,
                player: data?.players[position.id].player,
              };
            });

            return newFormations;
          });
          setUnSelectedPlayers(data?.unselectedPlayers || []);
          setUpperLine(data?.upperVariant || 0);
          setMiddleLine(data?.middleVariant || 0);
          setLowerLine(data?.lowerVariant || 0);
        }
      })
      .catch((err) => {
        alert(err?.message || 'Error');
      });
  }, []);

  const updateLineup = () => {
    updateFormation({
      _id: data?._id,
      formation: selectFormation,
      lowerVariant: lowerLine,
      middleVariant: middleLine,
      upperVariant: upperLine,
      players: selectedFormation.map((position: any) => {
        return {
          player: position.player?._id,
          position: position.id,
        };
      }),
    })
      .unwrap()
      .then(() => {
        toast.success('Lineup Updated Successfully');
        setChangedFlag(false);
      })
      .catch((err) => {
        toast.error(err?.message || 'Error');
      });
  };
  const getOverall = () => {
    if (selectedFormation?.length > 0) {
      let overall = 0.1;
      selectedFormation.forEach((position: any) => {
        if (position.player) {
          overall += position.player.overall;
        }
      });
      return Math.round(overall / 11);
    }
    return 0;
  };

  function LineTactics({ line, value, setter }: any) {
    return (
      <Stack direction="row" alignItems="center">
        <Typography variant="body2" sx={{ minWidth: '5rem' }}>
          {line}
        </Typography>
        <IconButton
          sx={{ color: value === 0 ? 'green' : 'white' }}
          onClick={() => {
            if (value === 0) return;
            setter(0);
          }}
        >
          <ArrowUpwardIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            if (value === 1) return;
            setter(1);
          }}
          sx={{ color: value === 1 ? 'green' : 'white' }}
        >
          <CenterFocusStrongIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            if (value === 2) return;
            setter(2);
          }}
          sx={{ color: value === 2 ? 'green' : 'white' }}
        >
          <ArrowDownwardIcon />
        </IconButton>
      </Stack>
    );
  }
  const setAsUnselected = (id: any) => {
    // if unselected contains the player skip the function
    if (unSelectedPlayers.find((p: any) => p._id === id) !== undefined) return;
    // update the unselected players
    setUnSelectedPlayers((u: any) => {
      let player;
      // remove the player from the dropped
      setSelectedFormation((prev: any) => {
        player = prev.find((p: any) => p.player?._id === id)?.player;
        if (!player) return prev;
        const NewDropped = prev.map((position: any) => {
          if (position?.player && position.player._id === id) {
            return {
              ...position,
              player: null,
            };
          }
          return position;
        });

        return NewDropped;
      });

      if (player) {
        return [...u, player];
      }
      return u;
    });
  };
  const handleDragEnd = (event: any) => {
    !changedFlag && setChangedFlag(true);
    if (event.over) {
      // check if the player in the unselected list or not
      const isPlayerUnselected = unSelectedPlayers.find((p: any) => p._id === event.active.id) !== undefined;
      console.log(isPlayerUnselected);
      const destination = selectedFormation.find((p: any) => p.id === event.over.id);
      setSelectedFormation((x: any) => {
        const NewDropped = x.map((position: any) => {
          // if the position has the player
          if (position.player && position.player._id === event.active.id) {
            return {
              ...position,
              player: destination?.player || null,
            };
          }
          // if the position is the same as the one
          if (position.id === event.over.id) {
            if (isPlayerUnselected) {
              // if the position is not empty swap players
              console.log('positoinplayer', position.player);
              const player = unSelectedPlayers.find((p: any) => p._id === event.active.id) || null;
              setUnSelectedPlayers((u: any) => {
                return position.player
                  ? u.filter((p: any) => p._id !== event.active.id).concat(position.player)
                  : u.filter((p: any) => p._id !== event.active.id);
              });

              return {
                ...position,
                player: player,
              };
            }
            // inside movement
            else {
              return {
                ...position,
                player: x.find((p: any) => p.player?._id === event.active.id)?.player || null,
              };
            }
          }

          return position;
        });
        return NewDropped;
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
          direction={{ xs: 'column', lg: 'row' }}
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
                {overall}
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
              value={selectFormation}
              onChange={(e) => {
                setSelectFormation(e.target.value);
              }}
            >
              {formationTypes?.map((option: any) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <Stack>
              <Typography variant="h6" textAlign="center">
                Line Tactics
              </Typography>
              <LineTactics line="Upper Line" value={upperLine} setter={setUpperLine} />
              <LineTactics line="Middle Line" value={middleLine} setter={setMiddleLine} />
              <LineTactics line="Lower Line" value={lowerLine} setter={setLowerLine} />
            </Stack>
          </Stack>
          <Stack gap={3} direction={{ xs: 'column', sm: 'row' }}>
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
              {selectedFormation?.length > 0 &&
                selectedFormation.map((position: any) => (
                  <LineUpEmpty key={position.id} x={position.x} y={position.y} id={position.id} name={position.name}>
                    {position.player ? (
                      <TestLineUpCard
                        player={position.player}
                        onDoubleClick={() => setAsUnselected(position.player.id)}
                      />
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
              <Grid container spacing={1}>
                {unSelectedPlayers?.slice((page - 1) * 6, page * 6)?.map((player: any) => (
                  <TestLineUpCard key={player.id} player={player} />
                ))}
              </Grid>
              <Pagination
                count={Math.ceil(unSelectedPlayers.length / 6)}
                page={page}
                onChange={(e, value) => setPage(value)}
              />
            </Stack>
          </Stack>
        </Stack>
      </DndContext>
      <Button variant="contained" onClick={updateLineup} disabled={!changedFlag}>
        Save
      </Button>
    </Container>
  );
}

export default Lineup;
