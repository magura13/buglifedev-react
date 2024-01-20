import { useState } from 'react';
import { register } from '../services/authService.ts';
import { UserCredentials } from '../types/UserData';

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const performRegister = async (credentials: UserCredentials) => {
    setLoading(true);
    setError('');
    try {
      const response = await register(credentials);
      return response;
    } catch (error) {
      setError('Erro ao registrar');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { performRegister, loading, error };
};

export default useRegister;
