import { useGetProfileImagesQuery } from '@/features/common/commonApiSlice';
import { Stack } from '@mui/material';
import React from 'react';

function ProfileImageList() {
  const { data, isLoading } = useGetProfileImagesQuery(undefined);
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        p: 2,
        backgroundColor: 'grey.400',
        flexWrap: 'wrap',
        img: {
          width: '60px',
          height: '60px',
          objectFit: 'cover',
          borderRadius: '50%',
        },
      }}
      gap={2}
    >
      {data?.map((item: any) => (
        <img key={item.img} src={`${import.meta.env.VITE_API_URL}/profiles/${item.img}`} alt="img" />
      ))}
    </Stack>
  );
}

export default ProfileImageList;
