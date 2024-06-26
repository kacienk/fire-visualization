// material-ui
import { Box, IconButton, Link, Theme, useMediaQuery } from '@mui/material';
import { GithubOutlined } from '@ant-design/icons';

// project import
import { Search } from './HeaderContent/Search';
import { Profile } from './HeaderContent/Profile';
import { Notification } from './HeaderContent/Notification';
import { MobileSection } from './HeaderContent/MobileSection';

// ==============================|| HEADER - CONTENT ||============================== //

export const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <>
      {!matchesXs && <Search />}
      {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

      <IconButton
        component={Link}
        href="https://github.com/codedthemes/mantis-free-react-admin-template"
        target="_blank"
        disableRipple
        color="secondary"
        title="Download Free Version"
        sx={{ color: 'text.primary', bgcolor: 'grey.100' }}
      >
        <GithubOutlined />
      </IconButton>

      <Notification />
      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </>
  );
};
