import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useDeleteComment from '../hooks/useDeleteComment.tsx';

const Comments = ({ data, forumPostId }) => {
  const { deleteCommentAction, isLoading, error } = useDeleteComment();

  const userId = localStorage.getItem("userId");
  
  const isFromUser = userId === data.userId;

  const handleDelete = async (commentId, forumPostId) => {
    try {
      await deleteCommentAction(commentId, forumPostId);
      toast.success('Comentário deletado!', { autoClose: 2000 });
    } catch (error) {
      toast.error(`Erro ao deletar comentário`, error.message);
    }
  };
  return (
    <div className="my-1 flex justify-between">
      <div>
        <p className="text-gray-700 text-xxs font-semibold">{data.userName}:</p>
        <p className="text-gray-700 text-xxs">{data.message}</p>
      </div>
      <div>
        {isFromUser ?
        <button
        onClick={() => handleDelete(data._id, forumPostId)}
        type="submit"
        className="mt-3 bg-red-500 hover:bg-red-700 text-white font text-xxs self-start py-0.00005 px-1 rounded"
      >
        Deletar
      </button>
      : null
      }
      </div>
    </div>
  );
};

export default Comments;
