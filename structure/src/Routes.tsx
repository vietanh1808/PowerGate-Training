import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import ProtectedRoute from './modules/common/components/ProtectedRoute';

const HomePage = lazy(() => import('./modules/home/pages/HomePage'));
const ContactPage = lazy(() => import('./modules/home/pages/ContactPage'));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('./modules/home/pages/RegisterPage'));
const ProfilePage = lazy(() => import('./modules/home/pages/ProfilePage'));
const PayrollPage = lazy(() => import('./modules/home/pages/PayrollPage'));
const PhotoPage = lazy(() => import('./modules/home/pages/PhotoPage'));

interface Props {}

export const Routes = (props: Props) => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Switch location={location}>
        <Route path={ROUTES.login} component={LoginPage} />
        <ProtectedRoute path={ROUTES.home} component={HomePage} />
        <Route path={ROUTES.contact} component={ContactPage} />
        <Route path={ROUTES.photo} component={PhotoPage} />
        <Route path={ROUTES.register} component={RegisterPage} />
        <Route path={ROUTES.detailUser} component={ProfilePage} />
        <Route path={ROUTES.payroll} component={PayrollPage} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </Suspense>
  );
};
