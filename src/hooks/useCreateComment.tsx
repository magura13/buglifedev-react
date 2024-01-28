import { useState } from 'react';
import { createComment } from '../services/commentService.ts';

const useCreateComment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const sendComment = async (postId: string, userId: string, message: string) => {
    setIsLoading(true);
    setError('');
    try {
      await createComment(postId, userId, message);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao enviar comentário.');
    } finally {
      setIsLoading(false);
    }
  };

  return { sendComment, isLoading, error };
};

export default useCreateComment;
