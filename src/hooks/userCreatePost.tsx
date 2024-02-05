import { useState } from 'react';
import { createPost } from '../services/forumPostService.ts';

const useCreatePost= () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const sendPost = async (
    userId: string | null,
    userName: string | null,
    content:{
      title:string
      message: string
    }
  ) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await createPost( userId, userName, content);
      return response.comment.message;
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao enviar comentário.');
    } finally {
      setIsLoading(false);
    }
  };

  return { sendPost, isLoading, error };
};

export default useCreatePost
;
