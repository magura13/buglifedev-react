import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useCreateComment from '../hooks/useCreateComment.tsx';

interface CommentFormProps {
  postId: string;
  userId: string;
  onCommentAdded: (newComment: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  userId,
  onCommentAdded,
}) => {
  const [commentMessage, setCommentMessage] = useState('');
  const { isLoading, sendComment } = useCreateComment();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!commentMessage.trim()) {
      toast.error('O comentário não pode estar vazio.');
      return;
    }
    try {
      await sendComment(postId, userId, commentMessage);
      setCommentMessage('');
      toast.success('Comentário adicionado!');
      console.log('commentMessage' + commentMessage);
      onCommentAdded(commentMessage);
    } catch (error) {
      toast.error('Erro ao adicionar o comentário: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        className="w-full p-2 text-sm text-gray-700 border rounded-lg focus:outline-none"
        rows={3}
        placeholder="Adicione um comentário..."
        value={commentMessage}
        onChange={(event) => setCommentMessage(event.target.value)}
        disabled={isLoading}
      />
      <button
        type="submit"
        className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={isLoading}
      >
        {isLoading ? 'Comentando...' : 'Comentar'}
      </button>
    </form>
  );
};

export default CommentForm;
