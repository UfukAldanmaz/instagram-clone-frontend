import { ReactNode, createContext, useState } from "react";
import { User } from "../models/AuthModels";
import { useAuth } from "../hooks/useAuth";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  isAuthenticated: () => boolean;
  user: User | null;
  setToken: (token: string) => void;
  refreshToken: () => void;
};

const initialValue = {
  isAuthenticated: () => false,
  user: null,
  setToken: () => {},
  refreshToken: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValue);

export const AuthProvider = ({ children }: Props) => {
  const { user, setToken, refreshToken } = useAuth();
  const { getItem } = useLocalStorage();
  const isAuthenticated = (): boolean => {
    return getItem("token") != null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setToken,
        isAuthenticated,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
