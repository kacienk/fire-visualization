import { ComponentType, Suspense } from 'react';

// project import
import { Loader } from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

export const Loadable =
  (Component: any) =>
  (
    props: any, // TODO types
  ) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
