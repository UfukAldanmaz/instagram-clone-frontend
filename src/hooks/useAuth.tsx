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
      const response = await logout(); // Call the service function
      if (response.status === 200) {
        // Logout was successful
        // You can perform any necessary client-side cleanup here
        console.log("Logout successful");
      } else {
        // Handle logout failure
        console.error("Logout failed");
      }
    } catch (error) {
      // Handle errors if necessary
    } finally {
      removeItem("token");
    }
  };
  return { getUser, setToken, logout: logoutUser };
};

// const refreshToken = async () => {
//   try {
//     const refreshToken = getItem("token");
//     if (refreshToken) {
//       const response = await axios.post("/auth/refresh", {
//         refreshToken,
//       });
//       if (response.status === 200) {
//         const newAccessToken = response.data.access_token;
//         setToken(newAccessToken);
//       } else {
//         console.error("Failed to refresh access token");
//       }
//     }
//   } catch (error) {
//     console.error("Error refreshing access token:", error);
//     throw error;
//   }
// };
// useEffect(() => {
//   const user = getItem("user");
//   if (user) {
//     setItem("user", JSON.stringify(user));
//   }
// }, []);
// const [user, setUser] = useState<User | null>(null);
// setItem("user", JSON.stringify(user));
// setUser(user);
// const user: User = JSON.parse(atob(token.split(".")[1]));
// setItem("user", "");
// setUser(null);
