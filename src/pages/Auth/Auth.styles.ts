export const FormSX = {
  p: 3,
  pt: 5,
  zIndex: 1,
  boxShadow: 6,
  top: '50%',
  left: '50%',
  color: 'white',
  border: '3px solid',
  borderColor: 'primary.main',
  transform: 'translate(-50%, -50%)',
  userSelect: 'none',
  overflow: 'hidden',
  position: 'absolute',
  borderRadius: '10px',
  transition: 'transform 0.3s',
  width: { xs: '90%', sm: 400 },
  img: {
    p: '16px 32px',
  },
  label: {
    color: 'primary.main',
  },

  button: {
    height: '3rem',
    color: 'white',
    textShadow: '1px 1px 1px rgba(0, 0, 0, 0.6)',
    textTransform: 'capitalize',
  },

  a: {
    fontWeight: '500',
    lineHeight: '19px',
    color: 'Green.Lighter',
    transition: 'color 0.3s',
    textShadow: '1px 1px 1px rgba(0, 0, 0, 0.6)',
  },

  '@keyframes wawes': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },

  '&::before, &::after': {
    content: '""',
    zIndex: -1,
    width: '600px',
    height: '800px',
    position: 'absolute',
    borderRadius: '40% 45% 35% 40%',
  },

  '&::before': {
    top: '-35%',
    left: '75%',
    animation: 'wawes 6s linear infinite',
    background: 'linear-gradient(90deg, rgba(0, 101, 243, 0.2) 0%, rgba(0, 120, 255, 0.4) 100%)',
  },

  '&::after': {
    top: '-30%',
    left: '70%',
    animation: 'wawes 8s linear infinite',
    background: 'linear-gradient(90deg, rgba(0, 110, 255, 0.5) 0%, rgba(0, 120, 255, 0.3) 100%)',
  },

  '& span': {
    fontSize: '0.75rem',
  },
  '& input': {
    fontSize: '16px',
    borderRadius: '5px',
    color: 'primary.main',
  },
  '& label.Mui-focused ': {
    pt: 0.2,
  },
  '& .MuiFormLabel-root': {
    fontSize: '16px',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'primary.main',
    },
    '&:hover fieldset': {
      borderColor: 'Green.Lighter',
    },
  },
};
