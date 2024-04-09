// project import
import { NavCard } from './DrawerContent/NavCard';
import { Navigation } from './DrawerContent/Navigation/Navigation';
import { SimpleBarScroll } from '../../../components/third-party/SimpleBar';

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
