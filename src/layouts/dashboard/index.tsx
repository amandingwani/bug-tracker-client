import { useState, ReactNode } from 'react';

import Box from '@mui/material/Box';

import Nav from './nav';
import Main from './main';
import Header from './header';
import SnackbarNotification from 'src/components/snackbarNotification';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <SnackbarNotification />
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
    </>
  );
}
