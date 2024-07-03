import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import PublicRoute from './PublicRoutes';
import PrivateRoute from './PrivateRoutes';

const CalcPage = lazy(() => import('pages/CalcPage'));
const HomePage = lazy(() => import('pages/HomePage'));
const UserRoutes = () => {
  return (
  <Routes>
    <Route element={<PublicRoute />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/frontend-slimmom" element={<HomePage />} />
    </Route>
    <Route element={<PrivateRoute />}>
      <Route path="/calculator-calories" element={<CalcPage />} />
    </Route>
  </Routes>
  );
};

export default UserRoutes;
