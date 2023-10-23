import { ReactNode, createContext } from "react";
import { User } from "../models/AuthModels";
import { useAuth } from "../hooks/useAuth";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  isAuthenticated: () => boolean;
  getUser: () => User | null;
  setToken: (token: string) => void;
};

const initialValue = {
  isAuthenticated: () => false,
  getUser: (): User | null => null,
  setToken: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValue);

export const AuthProvider = ({ children }: Props) => {
  const { getUser, setToken } = useAuth();
  const { getItem } = useLocalStorage();
  const isAuthenticated = (): boolean => {
    return getItem("token") != null;
  };

  return (
    <AuthContext.Provider
      value={{
        getUser,
        setToken,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
