// hooks/useAuthRedirect.js
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const useAuthRedirect = () => {
  const { isLoading, user } = useSelector((state) => state.userSingle);
  const location = useLocation();

  // Функция для проверки доступа к приватным маршрутам
  const protectRoute = () => {
    if (isLoading) {
      return { isLoading: true };
    }
    if (!user) {
      return { redirect: <Navigate to="/login" state={{ from: location }} replace /> };
    }
    return { isAccessible: true };
  };

  return { protectRoute, isLoading, user };
};
