import axios from 'axios';
import DOMPurify from 'dompurify';
import { LoginCredentials } from '../types/AuthData';
import { UserCredentials, UserResponse } from '../types/UserData';
import apiInstance from './refreshTokenService.ts';


const API_URL = process.env.REACT_APP_API_URL

interface LoginResponse {
  accessToken: string;
  userId: string;
  userName: string;
}

const sanitizeData = (data: string): string => {
  return DOMPurify.sanitize(data);
};

const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await apiInstance.post(`/signin`, credentials);
    const { accessToken, userId, userName } = response.data;
    const userData = { accessToken, userId, userName }
    
    return { accessToken, userId, userName };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.status === 401
          ? 'Invalid email / password'
          : 'Erro de servidor';
      throw new Error(errorMessage);
    } else {
      throw new Error('Erro ao fazer login');
    }
  }
};

const register = async (
  credentials: UserCredentials
): Promise<UserResponse> => {
  let errorMessage = 'Erro desconhecido ao fazer o cadastro.';
  try {
    const response = await apiInstance.post(`/user`, credentials);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (
        error.response.data.ValidationErrors &&
        error.response.data.ValidationErrors.length > 0
      ) {
        errorMessage = error.response.data.ValidationErrors[0].msg;
      } else if (
        error.response.data.response &&
        error.response.data.response.default
      ) {
        errorMessage = error.response.data.response.default;
      }
    }

    throw new Error(errorMessage);
  }
};

export { login, register };
