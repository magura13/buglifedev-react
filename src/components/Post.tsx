import React, { useState, useEffect } from 'react';
import formatDateTime from '../shared/dateFormatter';
import Comments from './Comments.tsx';
import CommentForm from './CommentForm.tsx';
import useCreateLike from '../hooks/useCreateLike.tsx';
import { LikeData } from '../types/LikeData.ts';
import { toast } from 'react-toastify';
import { ErrorFilter } from '../shared/errorfilter.ts';
import { useAuth } from '../contexts/authProvider.tsx';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Post = ({ data, isLoggedIn }) => {
  const formattedDate = formatDateTime(data.createdAt);
  const [showComments, setShowComments] = useState(false);
  const userName = localStorage.getItem('userName');
  const [userId, setUserId] = useState(
    localStorage.getItem('userId')?.toString()
  );
  const [comments, setComments] = useState(data.comments);
  const [likes, setLikes] = useState(data.likes);
  const { sendLike, sendDeleteLike } = useCreateLike();
  const { isAuthenticated } = useAuth();

  const addNewComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const removeComment = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== commentId)
    );
  };

  const addLike = (userId) => {
    setLikes((prevLikes) => [...prevLikes, userId]);
  };

  const removeLike = (userId) => {
    setLikes((prevLikes) => prevLikes.filter((like) => like !== userId));
  };

  const checkLiked = likes.filter((c) => c == userId);

  const handleLike = async () => {
    try {
      if (!isAuthenticated) {
        toast.info('Necessário login');
        return;
      }
      if (checkLiked.length === 0) {
        const forumPostId = data?._id;
        const likeData: LikeData = { forumPostId, userId };
        await sendLike(likeData);
        addLike(userId);
      } else {
        const forumPostId = data?._id;
        const likeData: LikeData = { forumPostId, userId };
        await sendDeleteLike(likeData);
        removeLike(userId);
      }
    } catch (err) {
      const filteredError = ErrorFilter.shapingResponse(err.response.status);
      toast.info(filteredError);
    }
  };

  const likeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1.2, opacity: 1, transition: { duration: 0.2 } },
    exit: { scale: 0.8, opacity: 0, transition: { duration: 0.2 } },
  };

  const handleCommentClick = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="rounded overflow-hidden shadow-lg p-4 mb-6 flex flex-col">
      <div className="flex flex-row items-start md:items-center mb-2 md:mb-0 justify-between">
        <div className="flex flex-row">
          <p className="text-gray-700 text-xxs mr-1 whitespace-nowrap">
            Criado por:
          </p>
          <p className="text-custom-blue text-xs text-xxs font-semibold mr-1 whitespace-nowrap">
            {data.userName}
          </p>
        </div>
        <div className="flex flex-row">
          <p className="text-gray-700 text-xxs mr-1 whitespace-nowrap">
            Postado em
          </p>
          <p className="text-custom-blue text-xxs font-semibold whitespace-nowrap">
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
      <div className="flex justify-between my-2">
        {/*
      {isAuthenticated ? 
        (<AnimatePresence initial={false} mode='wait'>
          {checkLiked.length > 0 ? (
            <motion.div
              key="liked"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={likeVariants}
              className='flex flex-row content-center cursor-pointer'
              onClick={handleLike}
            >
              <FontAwesomeIcon icon={faHeart} style={{ color: "#0089ef" }} />
              <p className='text-xs pl-1'>Liked</p>
            </motion.div>
          ) : (
            <motion.div
              key="unliked"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={likeVariants}
              className='flex flex-row content-center cursor-pointer'
              onClick={handleLike}
            >
              <FontAwesomeIcon icon={faHeart} />
              <p className='text-xs pl-1'>Like</p>
            </motion.div>
          )}
        </AnimatePresence>) 
        : 
        <div></div>}
        */}
        <p
          className="text-gray-700 text-xs md:text-sm mr-1 hover:underline hover:text-custom-blue cursor-pointer"
          onClick={handleCommentClick}
        >
          {comments.length} comentários
        </p>
      </div>
      <div>
        <AnimatePresence initial={false}>
          {showComments &&
            comments.map((comment, index) => (
              <Comments
                data={comment}
                onCommentDeleted={removeComment}
                forumPostId={data._id}
              />
            ))}
        </AnimatePresence>
      </div>
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
