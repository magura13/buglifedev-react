import { useState, useContext } from 'react';
import { login } from '../services/authService.ts';
import { storage } from '../utils/storage.ts';

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
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { performLogin, loading, error };
};

export default useLogin;
