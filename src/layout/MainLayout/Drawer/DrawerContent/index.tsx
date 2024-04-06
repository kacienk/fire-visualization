// project import
import { NavCard } from './NavCard';
import { Navigation } from './Navigation';
import { SimpleBarScroll } from '../../../../components/third-party/SimpleBar';

// ==============================|| DRAWER CONTENT ||============================== //

export const DrawerContent = () => (
  <SimpleBarScroll
    sx={{
      '& .simplebar-content': {
        display: 'flex',
        flexDirection: 'column',
      },
    }}
  >
    <Navigation />
    <NavCard />
  </SimpleBarScroll>
);
