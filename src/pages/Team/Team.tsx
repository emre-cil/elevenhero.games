import { Button, Modal, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import CardDetailModal from '../../components/Modals/CardDetailModal';
import SectionWrapper from '../../layout/SectionWrapper/SectionWrapper';

function Team() {
  const [selected, setSelected] = useState(null);
  const singleCardData = {
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
  };

  const [prompt, setPrompt] = useState(null);
  // const { data } = useGetCardWithIdQuery(selected?.id, { skip: selected === null });
  const handleOperation = (operation, item) => {
    setPrompt({
      title: `Would you like to ${operation} the card for`,
      item,
      operation,
    });
  };
  return (
    <>
      <SectionWrapper
        title="My Cards"
        sectionId="my-cards"
        setSelected={setSelected}
        handleOperation={handleOperation}
      />
      <Modal
        open={prompt !== null}
        onClose={() => setPrompt(null)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <>
          {prompt !== null && (
            <Stack
              sx={{
                width: '399px',
                p: 3,
                borderRadius: 2,
              }}
            >
              <Typography variant="Title3" color="black" sx={{ textAlign: 'center' }}>
                {prompt.title}
              </Typography>
              {prompt?.item?.price && (
                <Typography variant="Title3" color="Red.Base" sx={{ textAlign: 'center' }}>
                  € {prompt.item.price.toFixed(2)}
                </Typography>
              )}
              {prompt.operation && (
                <>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, height: '48px', borderRadius: '8px', textTransform: 'Capitalize' }}
                    onClick={() => {
                      // if (prompt.operation === 'buy') {
                      //   if (balance < prompt.item.price) {
                      //     setPrompt({ title: "You don't have enought money", back: true });
                      //     return;
                      //   }
                      //   dispatch(buyCard(prompt.item));
                      // } else if (prompt.operation === 'sell') {
                      //   dispatch(sellCard(prompt.item));
                      // }
                      setPrompt(null);
                      setSelected(null);
                    }}
                  >
                    <Typography variant="RegularNoneMedium"> {prompt.operation}</Typography>
                  </Button>
                </>
              )}
              <Button
                variant={prompt?.back ? 'contained' : 'text'}
                fullWidth
                sx={{ mt: prompt?.back ? 3 : '7px', height: '48px', borderRadius: '8px', textTransform: 'Capitalize' }}
                onClick={() => {
                  setPrompt(null);
                }}
              >
                <Typography variant="RegularNoneMedium">{(prompt?.back && 'Back') || 'Cancel'}</Typography>
              </Button>
            </Stack>
          )}
        </>
      </Modal>
      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <>
          <CardDetailModal
            data={singleCardData}
            setSelected={setSelected}
            selected={selected}
            handleOperation={handleOperation}
          />
        </>
      </Modal>
    </>
  );
}

export default Team;
