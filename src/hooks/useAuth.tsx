import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { User } from "../models/AuthModels";
import { logout } from "../services/auth/authService";
import axios from "axios";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const { getItem, setItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem("user");
    if (user) {
      setItem("user", JSON.stringify(user));
    }
  }, []);

  const setToken = (token: string) => {
    const user: User = JSON.parse(atob(token.split(".")[1]));

    setItem("token", token);
    setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logoutUser = async () => {
    try {
      const response = await logout(); // Call the service function
      if (response.status === 200) {
        // Logout was successful
        // You can perform any necessary client-side cleanup here
        console.log("Logout successful");
      } else {
        // Handle logout failure
        console.error("Logout failed");
      }

      setItem("user", "");
      setUser(null);
    } catch (error) {
      // Handle errors if necessary
    }
  };

  const refreshToken = async () => {
    try {
      const refreshToken = getItem("token");
      if (refreshToken) {
        const response = await axios.post("/auth/refresh", {
          refreshToken,
        });
        if (response.status === 200) {
          const newAccessToken = response.data.access_token;
          setToken(newAccessToken);
        } else {
          console.error("Failed to refresh access token");
        }
      }
    } catch (error) {
      console.error("Error refreshing access token:", error);
      throw error;
    }
  };

  return { user, setToken, logout: logoutUser, refreshToken };
};
