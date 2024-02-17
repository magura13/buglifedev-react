import {LikeData} from '../types/LikeData.ts'
import { useState } from 'react';
import { createLike } from '../services/likeService.ts'

const useCreateLike = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const sendLike= async (
    LikeData:LikeData
  ) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await createLike(LikeData);
      return response
    } catch (err) {
      throw err
    } finally {
      setIsLoading(false);
    }
  };

  return { sendLike, isLoading, error };
};

export default useCreateLike;
