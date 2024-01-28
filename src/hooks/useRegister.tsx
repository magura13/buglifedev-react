import { useState } from 'react';
import { register } from '../services/authService.ts';
import { UserCredentials } from '../types/UserData';

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const performRegister = async (credentials: UserCredentials) => {
    setLoading(true);
    try {
      const response = await register(credentials);
      if (response) {
        return response;
      }
    } catch (response) {
      throw response;
    } finally {
      setLoading(false);
    }
  };

  return { performRegister, loading, error };
};

export default useRegister;
