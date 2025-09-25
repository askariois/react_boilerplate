// routes/index.jsx
import { Route } from 'react-router-dom';
import { useAuthRedirect } from './useAuthRedirect';
import { publicRoutes } from   '../routes/public-routes';
import { protectedRoutes } from '../routes/protected-routes';

export const usePrivateRoutes = () => {
  const { protectRoute } = useAuthRedirect();

  const publicRouteElements = publicRoutes.map((route, index) => {
    return (
      <Route
        key={index}
        path={route.path}
        element={route.element}
      />
    );
  });

  const protectedRouteElements = protectedRoutes.map((route, index) => {
    const { isLoading, redirect } = protectRoute();
    return (
      <Route
        key={index}
        path={route.path}
        element={isLoading ? <div className="loading">Загрузка...</div> : redirect || route.element}
      />
    );
  });

  return [...publicRouteElements, ...protectedRouteElements];
};