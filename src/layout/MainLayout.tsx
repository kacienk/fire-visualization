import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Toolbar, useMediaQuery } from '@mui/material';

// project import
import { MainDrawer } from './MainLayout/Drawer/MainDrawer';
import { Header } from './MainLayout/Header/Header';
import { Breadcrumbs } from '../components/@extended/Breadcrumbs';
import { RootState } from '../store/reduxStore';
import { openDrawer } from '../store/reducers/menuSlice';
import { menuItems } from '../menu-items/menuItems';

// ==============================|| MAIN LAYOUT ||============================== //

export const MainLayout = () => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const dispatch = useDispatch();

  const { drawerOpen } = useSelector((state: RootState) => state.menu);

  // drawer toggler
  const [open, setOpen] = useState(drawerOpen);
  const handleDrawerToggle = () => {
    setOpen(!open);
    dispatch(openDrawer({ drawerOpen: !open }));
  };

  // set media wise responsive drawer
  useEffect(() => {
    setOpen(!matchDownLG);
    dispatch(openDrawer({ drawerOpen: !matchDownLG }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownLG]);

  useEffect(() => {
    if (open !== drawerOpen) setOpen(drawerOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerOpen]);

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header
        open={open}
        handleDrawerToggle={handleDrawerToggle}
      />
      <MainDrawer
        open={open}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}
      >
        <Toolbar />
        <Breadcrumbs
          navigation={menuItems}
          title
        />
        <Outlet />
      </Box>
    </Box>
  );
};
