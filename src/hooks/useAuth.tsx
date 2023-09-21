import { useEffect, useState } from "react";
import { useLocalStorage } from "./UseLocalStorage";
import { User } from "../models/AuthModels";

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const { getItem, setItem } = useLocalStorage();

    useEffect(() => {
        const user = getItem("user");
        if (user) {
            setItem("user", JSON.parse(user));
        }
    }, []);

    const setToken = (token: string) => {
        const user: User = JSON.parse(atob(token.split('.')[1]));

        setItem("user", JSON.stringify(user));
        setUser(user)
    };

    const logout = () => {
        setItem("user", "");
        setUser(null);
    };

    return { user, setToken, logout };
};
