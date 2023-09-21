import { ReactNode, createContext, useState } from "react";
import { User } from "../models/AuthModels";
import { useAuth } from "../hooks/useAuth";

type Props = {
    children?: ReactNode;
}

type IAuthContext = {
    isAuthenticated: boolean,
    setIsAuthenticated: (newState: boolean) => void
    user: User | null;
    setToken: (token: string) => void
}

const initialValue = {
    isAuthenticated: false,
    setIsAuthenticated: () => { },
    user: null,
    setToken: () => { },
}

const AuthContext = createContext<IAuthContext>(initialValue);

export const AuthProvider = ({ children }: Props) => {
    const { user, setToken } = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(initialValue.isAuthenticated);

    return (
        <AuthContext.Provider value={{ user, setToken, isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;