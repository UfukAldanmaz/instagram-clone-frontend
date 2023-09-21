export interface User {
    id: number;
    email: string;
}

export interface AuthResponse {
    access_token: string;
}

export interface SignUpFormValues {
    email: string;
    password: string;
}

export interface LoginFormValues {
    email: string;
    password: string;
}