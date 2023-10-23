import { useLocalStorage } from "./useLocalStorage";
import { User } from "../models/AuthModels";
import { logout } from "../services/auth/authService";

export const useAuth = () => {
  const { getItem, setItem, removeItem } = useLocalStorage();
  const getUser = (): User | null => {
    const token = getItem("token");
    if (!token) {
      return null;
    }

    const user: User = JSON.parse(atob(token.split(".")[1]));
    return user;
  };

  const setToken = (token: string) => {
    setItem("token", token);
  };

  const logoutUser = async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        console.log("Logout successful");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
    } finally {
      removeItem("token");
    }
  };
  return { getUser, setToken, logout: logoutUser };
};
