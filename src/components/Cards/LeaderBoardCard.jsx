import { Stack } from '@mui/material'
import React from 'react'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

function LeaderBoardCard({ color}) {
  return (
    <Stack sx={{
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)',
        backgroundColor: color,
        width: '10vw',
        maxWidth: '350px',
        aspectRatio: '1/1',
        justifyContent: 'center',
        alignItems: 'center',
        svg: {
            fontSize: '5vw',
            marginTop: "-2vw",
            color: 'white',
        }
       
    }}>
        <EmojiEventsIcon/>
    </Stack>
  )
}

export default LeaderBoardCard