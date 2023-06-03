import ProfileImageList from '@/components/ProfileImageList';
import { Box, Modal } from '@mui/material';
import { useState } from 'react';

function ProfileImage({ image }: { image: string | null }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <img
        src={`${import.meta.env.VITE_API_URL}/profiles/${image ? image : 'blankProfile.webp'}`}
        alt="profile"
        style={{
          width: 200,
          height: 200,
          objectFit: 'cover',
          borderRadius: '50%',
          cursor: 'pointer',
        }}
        onClick={() => setIsOpen((p) => !p)}
      />
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sx={{
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
        }}
      >
        <ProfileImageList setIsOpen={setIsOpen} />
      </Modal>
    </Box>
  );
}

export default ProfileImage;
