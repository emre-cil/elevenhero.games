import { useCreateTournamentMutation } from '@/features/tournamentApiSlice';
import { Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const CreateTournamentCard = () => {
  const [createTournament, { isLoading }] = useCreateTournamentMutation();
  const [amount, setAmount] = useState('');

  const createTournamentHandler = async () => {
    const pAmount = parseFloat(amount);
    if (pAmount < 0.1) return toast.error('Amount must be greater than 0.1');
    createTournament({ amount: parseFloat(amount) })
      .unwrap()
      .then((res) => {
        console.log(res);
        toast.success('Tournament created successfully');
        setAmount('');
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.data.message);
      });
  };

  return (
    <Stack
      gap={2}
      sx={{
        maxWidth: 345,
        boxShadow: 4,
        p: 2,
        borderRadius: 2,
      }}
    >
      <TextField label="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1">Estimated Reward: {amount !== '' && parseFloat(amount) * 0.95 * 2}</Typography>
        <Button
          variant="contained"
          sx={{
            height: 40,
            minWidth: 100,
          }}
          disabled={isLoading}
          onClick={createTournamentHandler}
        >
          {isLoading ? <CircularProgress size={16} /> : 'Create'}
        </Button>
      </Stack>
    </Stack>
  );
};

export default CreateTournamentCard;
