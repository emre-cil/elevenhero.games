import React, { useState } from 'react';
import { Stack, ClickAwayListener } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Sidebar({ accessToken, isOpen, setIsOpen }) {
  const [selected, setSelected] = useState(null);

  const links = [
    {
      id: 1,
      label: 'PROFILE',
      path: '/profile',
      requiredToken: true,
    },
    {
      id: 2,
      label: 'TEAM',
      path: '/team',
      requiredToken: true,
    },
    {
      id: 3,
      label: 'LINEUP',
      path: '/lineup',
      requiredToken: true,
    },
    {
      id: 4,
      label: 'LEADERBOARD',
      path: '/leaderboard',
      requiredToken: true,
    },
    {
      id: 5,
      label: 'MARKET',
      path: '/market',
      requiredToken: false,
    },
    {
      id: 6,
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
            style={{ zIndex: 1000, position: 'fixed', top: 0, left: 0, height: '100vh', width: '200px' }}
          >
            <Stack
              gap={1}
              sx={{
                height: '100%',
                width: '100%',
                pt: '95px',
                px: 3.5,

                backgroundColor: 'Ink.Darkest',
                borderRight: '3px solid',
                borderColor: 'Green.Base',
                borderBottomRightRadius: '20px',
              }}
            >
              {links.map((link) => (
                <React.Fragment key={link.id}>
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
                          color: selected === link.id ? 'Sky.White' : 'Sky.Base',
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
                </React.Fragment>
              ))}
            </Stack>
          </motion.div>
        </ClickAwayListener>
      )}
    </AnimatePresence>
  );
}

export default Sidebar;
