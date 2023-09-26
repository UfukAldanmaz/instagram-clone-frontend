import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { User } from "../models/AuthModels";
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
        const user: User = JSON.parse(atob(token.split('.')[1]));

        setItem("user", JSON.stringify(user));
        setUser(user)
    };

    const logout = () => {
        setItem("user", "");
        setUser(null);
    };

    const refreshToken = async () => {
        try {
            const refreshToken = getItem('/refresh')
            if (refreshToken) {
                const response = await axios.post('/api/refresh', {
                    refreshToken
                });
                if (response.status === 200) {
                    const newAccessToken = response.data.access_token;
                    setToken(newAccessToken)
                } else {
                    console.error("Failed to refresh access token");
                }
            }
        } catch (error) {
            console.error("Error refreshing access token:", error);
        }
    }

    return { user, setToken, logout, refreshToken };
};
