import { useState } from 'react';
import { login } from '../services/authService.ts';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const performLogin = async (email: string, password: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await login({ email, password });
      return response;
    } catch (error) {
      setError('Err to login');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { performLogin, loading, error };
};

export default useLogin;
