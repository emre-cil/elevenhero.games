import { Stack } from '@mui/material'
import React from 'react'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

function LeaderBoardCard({ color,mt}) {
  return (
    <Stack sx={{
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)',
        backgroundColor: color,
        width: {xs:"20vw",sm:"10vw"},
        height: {xs:"20vw",sm:"10vw"},
        maxWidth: '350px',
        maxHeight: '350px',
        justifyContent: 'center',
        mt,
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