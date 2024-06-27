import { useState } from 'react';
import { deleteComment } from '../services/commentService.ts';

const useDeleteComment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const deleteCommentAction = async (commentId, forumPostId, userId) => {
    try {
      const response = await deleteComment(commentId, forumPostId, userId);
      return response.default;
    } catch (error) {
      setError(error.response?.data?.message || 'Erro ao  deletar comentário.');
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteCommentAction, isLoading, error };
};

export default useDeleteComment;
