export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  userId: string;
  userName: string;
  status: number;
}
