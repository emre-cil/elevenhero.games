import { useGetProfileImagesQuery } from '@/features/common/commonApiSlice';
import { useUpdateImageMutation } from '@/features/user/userApiSlice';
import { Container } from '@mui/material';
import { toast } from 'react-hot-toast';

function ProfileImageList({ setIsOpen }: { setIsOpen: any }) {
  const { data, isLoading } = useGetProfileImagesQuery(undefined);
  const [updateImage] = useUpdateImageMutation();
  console.log(data);
  const updateImageHandler = (img: string) => {
    updateImage({ image: img })
      .unwrap()
      .then(() => {
        toast.success('Profile image updated successfully!');
        setIsOpen(false);
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };
  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        maxHeight: '80vh',
        overflowY: 'auto',
        backgroundColor: 'grey.400',
        flexWrap: 'wrap',
        img: {
          width: '60px',
          height: '60px',
          objectFit: 'cover',
          cursor: 'pointer',
          borderRadius: '50%',
        },
        gap: 2,
      }}
    >
      {data?.map((item: any) => (
        <img
          key={item.img}
          src={`${import.meta.env.VITE_API_URL}/profiles/${item.img}`}
          alt="img"
          onClick={() => updateImageHandler(item._id)}
        />
      ))}
    </Container>
  );
}

export default ProfileImageList;
