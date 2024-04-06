// material-ui
import { useTheme } from '@mui/material/styles';
import { AppBar, AppBarPropsColorOverrides, Color, IconButton, Toolbar, useMediaQuery } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';

// project import
import { AppBarStyled } from './AppBarStyled';
import { HeaderContent } from './HeaderContent';

// assets
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

type HeaderProps = {
  open: boolean;
  handleDrawerToggle: () => void;
};

export const Header = ({ open, handleDrawerToggle }: HeaderProps) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  const iconBackColor = 'grey.100';
  const iconBackColorOpen = 'grey.200';

  // common header
  const mainHeader = (
    <Toolbar>
      <IconButton
        disableRipple
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        edge="start"
        color="secondary"
        sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor, ml: { xs: 0, lg: -2 } }}
      >
        {!open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </IconButton>
      <HeaderContent />
    </Toolbar>
  );

  // app-bar params
  const appBar = {
    position: 'fixed',
    color: 'inherit',
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      boxShadow: theme.shadows[1],
    },
  } as const;

  return (
    <>
      {!matchDownMD ? (
        <AppBarStyled
          // open={open}
          {...appBar}
        >
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}>{mainHeader}</AppBar>
      )}
    </>
  );
};
