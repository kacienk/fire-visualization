// material-ui
import { Theme, styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';

// project import

const openedMixin = (theme: Theme) => ({
  width: 260,
  borderRight: `1px solid ${theme.palette.divider}`,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  boxShadow: 'none',
});

const closedMixin = (theme: Theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: 0,
  borderRight: 'none',
  boxShadow: theme.shadows[1],
});

// ==============================|| DRAWER - MINI STYLED ||============================== //

export const MiniDrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme /*, open*/ }) => ({
    width: 260,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    // ...(open && {
    //   ...openedMixin(theme),
    //   '& .MuiDrawer-paper': openedMixin(theme),
    // }),
    // ...(/*!open &&*/ {
    //   ...closedMixin(theme),
    //   '& .MuiDrawer-paper': closedMixin(theme),
    // }),
  }),
);