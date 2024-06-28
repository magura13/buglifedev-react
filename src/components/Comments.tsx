import React from 'react';
import { toast } from 'react-toastify';
import useDeleteComment from '../hooks/useDeleteComment.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const Comments = ({ data, forumPostId, onCommentDeleted, showComments }) => {
  const { deleteCommentAction, isLoading, error } = useDeleteComment();
  const userId = localStorage.getItem("userId");
  const isFromUser = userId === data.userId;

  const handleDelete = async (commentId, forumPostId) => {
    try {
      await deleteCommentAction(commentId, forumPostId, userId);
      toast.success('Comentário deletado!', { autoClose: 2000 });
      onCommentDeleted(commentId);
    } catch (error) {
      toast.error(`Erro ao deletar comentário: ${error.message}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: showComments ? 1 : 0, height: showComments ? 'auto' : 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <div className="my-1 flex justify-between">
        <div>
          <p className="text-gray-700 text-xxs font-semibold">{data.userName}:</p>
          <p className="text-gray-700 text-xxs">{data.message}</p>
        </div>
        <div>
          {isFromUser ? (
            <button
              onClick={() => handleDelete(data._id, forumPostId)}
              type="button"
              className="mt-3 bg-transparent px-2 py-1 outline-none hover:bg-[#EE4731] text-white font text-xxs self-start rounded group transition-colors duration-300"
            >
              <FontAwesomeIcon
                icon={faTrash}
                className="text-[#EE4731] group-hover:text-white transition-colors duration-300"
              />
            </button>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};

export default Comments;
