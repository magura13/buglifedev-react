import React, { useState, useEffect } from 'react';
import formatDateTime from '../shared/dateFormatter';
import Comments from './Comments.tsx';
import CommentForm from './CommentForm.tsx';
import useCreateLike from '../hooks/useCreateLike.tsx';
import { LikeData } from '../types/LikeData.ts';
import { toast } from 'react-toastify';
import { ErrorFilter } from '../shared/errorfilter.ts';
import { useAuth } from '../contexts/authProvider.tsx';

const Post = ({ data, isLoggedIn }) => {
  const formattedDate = formatDateTime(data.createdAt);
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const userName = localStorage.getItem('userName');
  const userId = localStorage.getItem('userId')?.toString();
  const [comments, setComments] = useState(data.comments);
  const { sendLike, isLoading, error } = useCreateLike();
  const { isAuthenticated } = useAuth();

  const addNewComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleLike = async () => {
    try {
      if (!isAuthenticated) {
        toast.info('Necessário login');
        return;
      }
      const forumPostId = data?._id;
      const likeData: LikeData = { forumPostId, userId };
      await sendLike(likeData);
      toast.success('Post curtido :)', { autoClose: 1000 });
    } catch (err) {
      const filteredError = ErrorFilter.shapingResponse(err.response.status);
      toast.info(filteredError);
    }
  };

  const handleCommentClick = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="rounded overflow-hidden shadow-lg p-4 mb-6 flex flex-col">
      <div className="flex flex-row items-start md:items-center mb-2 md:mb-0 justify-between">
        <div className="flex flex-row">
          <p className="text-gray-700 text-xxs mr-1">Criado por:</p>
          <p className="text-custom-blue text-xs text-xxs font-semibold mr-1">
            {data.userName}
          </p>
        </div>
        <div className="flex flex-row">
          <p className="text-gray-700 text-xxs mr-1">Postado em</p>
          <p className="text-custom-blue text-xxs font-semibold">
            {formattedDate}
          </p>
        </div>
      </div>
      <h3 className="font-bold text-custom-blue text-xl mb-2">
        {data.content?.title}
      </h3>
      <div className="aspect-w-1 aspect-h-1 flex justify-center">
        {data.content?.images.length > 0 && (
          <img
            className="object-cover"
            src={data.content?.images[0].path}
            alt={data.content?.title}
          />
        )}
      </div>
      <p className="text-gray-700 text-xs mt-2 md:text-xs">
        {data.content?.message}
      </p>

      <div className="flex justify-end my-2">
        <p
          className="text-gray-700 text-sm mr-1 hover:underline hover:text-custom-blue cursor-pointer"
          onClick={handleCommentClick}
        >
          {data.comments.length} comentários
        </p>
      </div>

      {showComments &&
        comments.map((comment, index) => (
          <Comments key={index} data={comment} forumPostId={data._id} />
        ))}
      {isAuthenticated && (
        <CommentForm
          postId={data._id}
          userId={userId}
          userName={userName}
          onCommentAdded={addNewComment}
        />
      )}
    </div>
  );
};

export default Post;
