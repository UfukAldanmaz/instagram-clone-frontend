import { ReactNode, createContext, useState } from "react";

type Props = {
    children?: ReactNode;
}

type IAuthContext = {
    auth: boolean,
    setAuth: (newState: boolean) => void
}

const initialValue = {
    auth: false,
    setAuth: () => { }
}

const AuthContext = createContext<IAuthContext>(initialValue);

export const AuthProvider = ({ children }: Props) => {
    const [auth, setAuth] = useState(initialValue.auth);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;