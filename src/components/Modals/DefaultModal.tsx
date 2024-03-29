import { useEffect, useState, FC, ReactNode } from 'react';
import { Button, Modal, Stack, Typography } from '@mui/material';

type DefaultModalProps = {
  open: boolean;
  setOpen: (open: any) => void;
  onSuccess: () => void;
  successText: string;
  title: string;
  successColor?: string;
  disableCancel?: boolean;
  icon?: ReactNode;
  successLoading?: boolean;
  timer?: string;
};

const DefaultModal: FC<DefaultModalProps> = ({
  open,
  setOpen,
  onSuccess,
  successText,
  title,
  successColor,
  disableCancel = false,
  successLoading = false,
  icon,
  timer,
}) => {
  const [formattedTime, setFormattedTime] = useState(timer ? Number(localStorage.getItem(timer)) - Date.now() : 0);
  useEffect(() => {
    if (timer) {
      try {
        const interval = setInterval(() => {
          setFormattedTime((prev) => {
            const time = prev - 1000;
            if (time <= 0) {
              clearInterval(interval);
            }
            return time;
          });
        }, 1000);
      } catch (e) {
        console.log(e);
      }
    }
  }, []);
  return (
    <Modal
      open={open}
      onClose={() => setOpen(null)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <Stack
        sx={{
          width: { xs: '75%', sm: '400px' },
          background: `linear-gradient(0deg, #0b0f0c 0%, #0f1b12 15%, #16331c 45%,#1E5128 65%, #217532 100%)`,
          outline: 'none',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 5,
        }}
      >
        {icon && (
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              pt: 2,
              svg: {
                color: 'grey.600',
                fontSize: '4rem',
              },
            }}
          >
            {icon}
          </Stack>
        )}
        <Typography
          variant="h6"
          p={2}
          sx={{
            textAlign: 'center',
          }}
        >
          {title}
        </Typography>
        <Stack
          direction="row"
          justifyContent="flex-end"
          sx={{
            mt: 1,
            borderTop: '1px solid',
            borderColor: 'grey.700',
          }}
        >
          {!disableCancel && (
            <Button
              sx={{
                color: 'error.light',
              }}
              fullWidth
              onClick={() => setOpen(null)}
            >
              Cancel
            </Button>
          )}
          <Button
            fullWidth
            onClick={() => {
              if (timer) {
                localStorage.setItem(timer, (Date.now() + 120000).toString());
              }
              onSuccess();
            }}
            disabled={(timer !== undefined && formattedTime > 0) || successLoading}
            sx={{
              position: 'relative',
              borderLeft: !disableCancel ? '1px solid' : 'none',
              borderColor: 'grey.700',
              borderRadius: 0,
              py: !disableCancel ? 1.5 : 2,
              minHeight: '3.5rem',
              color: successColor || 'text.main',
            }}
          >
            {formattedTime > 0 ? (
              <Typography
                variant="body2"
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 6,
                  py: 1.5,
                  fontSize: '1rem',
                  color: 'text.primary',
                }}
              >
                0{Math.floor(formattedTime / 1000 / 60)} : {Math.floor((formattedTime / 1000) % 60) < 10 && '0'}
                {Math.floor((formattedTime / 1000) % 60)}
              </Typography>
            ) : (
              successText
            )}
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default DefaultModal;
