import React, { Fragment, Suspense, lazy } from 'react';
// router
import { Switch, Route } from 'react-router-dom';
// material
import { CircularProgress } from '@material-ui/core';
// layout
import DashboardLayout from '../layouts/dashboard';
// paths
import { PATH_HOME } from './paths';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<CircularProgress />}>
    <Switch>
      {routes.map((route, index) => {
        const Component = route.component || Fragment;
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        return (
          <Route
            key={index}
            exact={route.exact}
            path={route.path}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Component {...props} />
                  )}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

export const routes = [
  {
    exact: true,
    path: PATH_HOME.login,
    layout: DashboardLayout,
    component: lazy(() => import('../pages/ThreeSimulation'))
  },
  {
    exact: true,
    path: '/simulation',
    layout: DashboardLayout,
    component: lazy(() => import('../pages/ThreeSimulation'))
  }
];
