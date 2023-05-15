import { useState, FC, Fragment } from 'react';
import { Stack, ClickAwayListener } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

type SidebarProps = {
  accessToken: string | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const Sidebar: FC<SidebarProps> = ({ accessToken, isOpen, setIsOpen }) => {
  const [selected, setSelected] = useState<any>(null);

  const links = [
    {
      id: 1,
      label: 'PROFILE',
      path: '/profile',
      requiredToken: true,
    },
    {
      id: 2,
      label: 'INVENTORY',
      path: '/inventory',
      requiredToken: true,
    },

    {
      id: 4,
      label: 'LINEUP',
      path: '/lineup',
      requiredToken: true,
    },
    {
      id: 5,
      label: 'LEADERBOARD',
      path: '/leaderboard',
      requiredToken: true,
    },
    {
      id: 6,
      label: 'MARKET',
      path: '/market',
      requiredToken: true,
    },
    {
      id: 7,
      label: 'TOURNAMENT',
      path: '/tournament',
      requiredToken: true,
    },
  ];
  return (
    <AnimatePresence>
      {isOpen && (
        <ClickAwayListener onClickAway={() => window.innerWidth < 900 && setIsOpen(false)} touchEvent="onTouchEnd">
          <motion.div
            initial={window.innerWidth < 900 ? { x: '-100%' } : { x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}
            style={{
              zIndex: 9999,
              position: 'fixed',
              marginTop: '75px',
              top: 0,
              left: 0,
              height: 'calc(100vh - 75px)',
              width: '200px',
            }}
          >
            <Stack
              gap={1}
              sx={{
                height: '100%',
                width: '100%',
                pt: '15px',
                px: 3.5,
                background: `linear-gradient(180deg, #0b0f0c 0%, #0f1b12 25%, #16331c 50%,#1E5128 75%, #217532 100%)`,
                borderRight: '3px solid',
                borderColor: 'text.secondary',
              }}
            >
              {links.map((link) => (
                <Fragment key={link.id}>
                  {accessToken || !link.requiredToken ? (
                    <Stack
                      sx={{
                        span: {
                          height: '3px',
                          backgroundColor: selected === link.id ? 'Green.Base' : 'transparent',
                        },
                        a: {
                          userSelect: 'none',
                          textDecoration: 'none',
                          color: selected === link.id ? 'grey.900' : 'grey.700',
                        },
                      }}
                    >
                      <Link
                        onClick={() => {
                          setSelected(link.id);
                          window.innerWidth < 900 && setIsOpen(false);
                        }}
                        to={link.path}
                      >
                        {link.label}
                      </Link>
                      <motion.span
                        initial={{ width: 0 }}
                        animate={{ width: selected === link.id ? '100%' : 0 }}
                        exit={{ width: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Stack>
                  ) : null}
                </Fragment>
              ))}
            </Stack>
          </motion.div>
        </ClickAwayListener>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
