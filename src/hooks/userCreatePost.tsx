import { useState } from 'react';
import { createPost } from '../services/forumPostService.ts';

const useCreatePost= () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendPost = async (
    userId: string | null,
    userName: string | null,
    content:{
      title:string
      message: string
    }
  ) => {
    setIsLoading(true);
    try {
      const response = await createPost( userId, userName, content);
      return response;
    } catch (err) {
      throw err
    } finally {
      setIsLoading(false);
    }
  };

  return { sendPost, isLoading};
};

export default useCreatePost
;
