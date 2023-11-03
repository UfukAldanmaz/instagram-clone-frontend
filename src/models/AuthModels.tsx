export interface User {
  id: string;
  email: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface SignUpFormValues {
  email: string;
  password: string;
  username: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}
export interface RefreshTokenResponse {
  access_token: string;
}
