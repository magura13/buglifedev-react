import { useState } from 'react';
import { createComment } from '../services/commentService.ts';

const useCreateComment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const sendComment = async (
    postId: string | null,
    userId: string | null,
    userName: string | null,
    message: string
  ) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await createComment(postId, userId, userName, message);
      return response.comment.message;
    } catch (err) {
      throw err
    } finally {
      setIsLoading(false);
    }
  };

  return { sendComment, isLoading, error };
};

export default useCreateComment;
