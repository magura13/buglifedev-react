import { LikeData } from '../types/LikeData.ts';
import { useState } from 'react';
import { deleteLike } from '../services/likeService.ts';

const useDeleteLike = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const deleteLike = async (LikeData: LikeData) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await deleteLike(LikeData);
      return response;
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteLike, isLoading, error };
};

export default useDeleteLike;
