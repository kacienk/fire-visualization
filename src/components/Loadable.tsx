/* eslint-disable @typescript-eslint/no-explicit-any */

import { Suspense } from 'react';

// project import
import { Loader } from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

export const Loadable = (Component: any) => {
  const LoadableComponent = (props: any) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

  LoadableComponent.displayName = `Loadable(${Component.displayName || Component.name || 'Component'})`;

  return LoadableComponent;
};
