import { useState } from 'react';
import axios from 'axios';
import { login } from '../services/authService.ts';
import { storage } from '../utils/storage.ts';
import { toast } from 'react-toastify';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const performLogin = async (email: string, password: string) => {
    setLoading(true);
    setError('');
    try {
      storage.clearStorage();

      const response = await login({ email, password });

      storage.setItem('accessToken', response.accessToken);
      storage.setItem('userId', response.userId);
      storage.setItem('userName', response.userName);

      return response;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError('Invalid email / password');
        } else {
          setError('Erro de servidor');
        }
      } else {
        setError('Erro ao fazer login');
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { performLogin, loading, error };
};

export default useLogin;
function closeModal() {
  throw new Error('Function not implemented.');
}
