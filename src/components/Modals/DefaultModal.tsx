import { Button, Modal, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

type DefaultModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
  successText: string;
  title: string;
  successColor?: string;
  disableCancel?: boolean;
  icon?: React.ReactNode;
  successLoading?: boolean;
  timer?: string;
};

const DefaultModal: React.FC<DefaultModalProps> = ({
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
      onClose={() => setOpen(false)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack
        sx={{
          width: { xs: '80%', sm: '450px' },
          backgroundColor: 'grey.50',
          outline: 'none',
          borderRadius: 2,
        }}
      >
        {icon && (
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              pt: 2,
              svg: {
                color: 'grey.500',
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
            borderColor: 'grey.200',
          }}
        >
          {!disableCancel && (
            <Button
              sx={{
                color: 'grey.500',
              }}
              fullWidth
              onClick={() => setOpen(false)}
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
              borderColor: 'grey.200',
              borderRadius: 0,
              py: !disableCancel ? 1.5 : 2,
              minHeight: '3.5rem',
              color: successColor || 'primary.main',
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
                  color: 'error.light',
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
