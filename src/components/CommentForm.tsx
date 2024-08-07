import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import useCreateComment from '../hooks/useCreateComment.tsx';
import { ErrorFilter } from '../shared/errorfilter.ts';
import { useAuth } from '../contexts/authProvider.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

interface CommentFormProps {
  postId: string | null;
  userId: string | null | undefined;
  userName: string | null;
  onCommentAdded: (newComment) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  userId,
  userName,
  onCommentAdded,
}) => {
  const [commentMessage, setCommentMessage] = useState('');
  const { isLoading, sendComment } = useCreateComment();
  const { isAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.info('Necessário login');
      return;
    }
    if (!commentMessage.trim()) {
      toast.error('O comentário não pode estar vazio.');
      return;
    }
    try {
      const newComment = await sendComment(
        postId,
        userId,
        userName,
        commentMessage
      );
      setCommentMessage('');
      toast.success('Comentário adicionado!', { autoClose: 1000 });
      onCommentAdded(newComment);
    } catch (error) {
      const filteredError = ErrorFilter.shapingResponse(error.response.status);
      toast.error('Erro ao adicionar o comentário: ' + filteredError);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        className="w-full h-24 p-2 text-sm text-gray-700 border rounded-lg focus:outline-none"
        rows={3}
        placeholder="Adicione um comentário..."
        value={commentMessage}
        onChange={(event) => setCommentMessage(event.target.value)}
        disabled={isLoading}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-xxxs text-white font-bold py-2 px-2 rounded-full h-12 w-12 flex items-center justify-center"
        disabled={isLoading}
      >
        <FontAwesomeIcon icon={faComment} style={{ color: '#ffffff' }} />
        {isLoading ? '...' : 'Add'}
      </button>
    </form>
  );
};

export default CommentForm;
