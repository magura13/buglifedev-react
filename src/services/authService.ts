import axios from 'axios';
import { LoginCredentials, LoginResponse } from '../types/AuthData.ts';
import { UserCredentials, UserResponse } from '../types/UserData.ts';

const API_URL = process.env.REACT_APP_API_URL;

const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_URL}/signin`, credentials);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    } else {
      throw new Error('Erro ao fazer login');
    }
  }
};

const register = async (
  credentials: UserCredentials
): Promise<UserResponse> => {
  const response = await axios.post(`${API_URL}/user`, credentials);
  return response.data;
};

export { login, register };
