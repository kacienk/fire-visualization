// import { lazily } from 'react-lazily';

// project import
// import { Loadable } from '../components/Loadable';
import { MainLayout } from '../layout/MainLayout';
import { DashboardDefault } from '../pages/dashboard/DashboardDefault';
import { ComponentColor } from '../pages/components-overview/ComponentColor';
import { SamplePage } from '../pages/extra-pages/SamplePage';
import { ComponentShadow } from '../pages/components-overview/ComponentShadow';
import { ComponentTypography } from '../pages/components-overview/ComponentTypography';
import { AntIcons } from '../pages/components-overview/AntIcons';

// render - dashboard
// const DashboardDefault = Loadable(lazily(() => import('../pages/dashboard/index')));

// // render - sample page
// const SamplePage = Loadable(lazily(() => import('../pages/extra-pages/SamplePage')));

// // render - utilities
// const Typography = Loadable(lazily(() => import('../pages/components-overview/Typography')));
// const Color = Loadable(lazily(() => import('../pages/components-overview/Color')));
// const Shadow = Loadable(lazily(() => import('../pages/components-overview/Shadow')));
// const AntIcons = Loadable(lazily(() => import('../pages/components-overview/AntIcons')));
// TODO fix lazy loading

// ==============================|| MAIN ROUTING ||============================== //

export const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />, //<div>DashboardDefault /</div>, //<DashboardDefault />,
    },
    {
      path: 'color',
      element: <ComponentColor />,
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
      element: <ComponentShadow />,
    },
    {
      path: 'typography',
      element: <ComponentTypography />,
    },
    {
      path: 'icons/ant',
      element: <AntIcons />,
    },
  ],
};
