// project import
import { Navigation } from './DrawerContent/Navigation/Navigation';
import { SimpleBarScroll } from '../../../components/third-party/SimpleBar';
import WorkspaceNavigation, { sampleData } from '../../../components/WorkspaceNavigation/WorkspaceNavigation';

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
    <WorkspaceNavigation data={sampleData}/>
    <Navigation />
  </SimpleBarScroll>
);
