import { lazily } from 'react-lazily';

// project import
import { Loadable } from '../components/Loadable';
import { MainLayout } from '../layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazily(() => import('../pages/dashboard/index')));

// render - sample page
const SamplePage = Loadable(lazily(() => import('../pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazily(() => import('../pages/components-overview/Typography')));
const Color = Loadable(lazily(() => import('../pages/components-overview/Color')));
const Shadow = Loadable(lazily(() => import('../pages/components-overview/Shadow')));
const AntIcons = Loadable(lazily(() => import('../pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

export const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />,
    },
    {
      path: 'color',
      element: <Color />,
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />,
        },
      ],
    },
    {
      path: 'sample-page',
      element: <SamplePage />,
    },
    {
      path: 'shadow',
      element: <Shadow />,
    },
    {
      path: 'typography',
      element: <Typography />,
    },
    {
      path: 'icons/ant',
      element: <AntIcons />,
    },
  ],
};
