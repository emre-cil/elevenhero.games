import { Box, Slider, Stack, Typography } from '@mui/material';
import { useState, FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowDownIcon from '@/assets/Icons/arrow-down.svg';
import FilterTypes from '@/data/FilterTypes.json';

type FilterProps = {
  range: number[];
  cardType: string | null;
  position: string | null;
  setRange: (range: any) => void;
  setCardType: (cardType: any) => void;
  setPosition: (position: any) => void;
  filterValues: any;
};

const Filter: FC<FilterProps> = ({ range, cardType, position, setRange, setCardType, setPosition, filterValues }) => {
  const [open, setOpen] = useState<any>([]);

  const filterHeader = (filter: any) => (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      onClick={() =>
        setOpen(open.includes(filter.id) ? open.filter((id: any) => id !== filter.id) : [...open, filter.id])
      }
      sx={{
        cursor: 'pointer',
        userSelect: 'none',
        img: {
          filter: 'invert(1)',
          width: 16,
          height: 16,
          transition: 'transform 0.3s ease',
          transform: open.includes(filter.id) ? 'rotateX(180deg)' : 'rotateX(0deg)',
        },
      }}
    >
      <Typography variant="body2" component="h6">
        {filter.title}
      </Typography>
      <img src={ArrowDownIcon} alt="arrow" />
    </Stack>
  );
  return (
    <Box
      sx={{
        backgroundColor: 'grey.900',
        borderRadius: 2,
        p: 3,
        minWidth: '199px',
      }}
    >
      {FilterTypes.map((filter) => (
        <Stack
          key={filter.id}
          sx={{
            '&:last-of-type > span': {
              display: 'none',
            },
            '& .divider-item': {
              display: 'block',
              width: '100%',
              height: '1px',
              backgroundColor: 'Sky.Light',
              my: 2,
            },
          }}
        >
          {filterHeader(filter)}
          <AnimatePresence>
            {open.includes(filter.id) && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
              >
                <Stack
                  sx={{
                    mt: 2,
                    '&:last-of-type': {
                      mb: 0,
                    },
                  }}
                >
                  {filter?.items?.map((item) => (
                    <Typography
                      key={item}
                      variant={cardType === item || position === item ? 'body2' : 'h3'}
                      component="p"
                      onClick={() => {
                        if (filter.id === 0) {
                          setCardType(cardType === item ? null : item);
                        } else if (filter.id === 1) {
                          setPosition(position === item ? null : item);
                        }
                      }}
                      sx={{
                        color: cardType === item || position === item ? 'Red.Base' : 'Ink.Light',
                        cursor: 'pointer',
                      }}
                    >
                      {item} ({filterValues[item]})
                    </Typography>
                  ))}

                  {filter?.title === 'Price' && (
                    <>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                        <Typography variant="body2">€ {range[0].toFixed(2)}</Typography>
                        <Typography variant="body2">€ {range[1].toFixed(2)}</Typography>
                      </Stack>

                      <Slider
                        getAriaLabel={() => 'filterRange'}
                        value={range}
                        min={0}
                        max={30}
                        step={1}
                        onChange={(event, newValue) => setRange(newValue)}
                        sx={{
                          width: 'calc(100% - 12px)',
                          ml: '6px',
                          '& .MuiSlider-rail': {
                            backgroundColor: 'Sky.Light',
                          },
                          '& .MuiSlider-track': {
                            border: 0,
                          },
                          '& .MuiSlider-thumb': {
                            backgroundColor: 'grey.900',
                            width: 12,
                            height: 12,
                            border: '2px solid currentColor',
                          },
                          '& *': {
                            boxShadow: 'none!important',
                          },
                        }}
                      />
                    </>
                  )}
                </Stack>
              </motion.div>
            )}
          </AnimatePresence>
          <span className="divider-item" />
        </Stack>
      ))}
    </Box>
  );
};

export default Filter;
