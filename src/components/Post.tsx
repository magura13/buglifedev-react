import React, { useEffect, useState } from 'react';
import formatDateTime from '../shared/dateFormatter';
import Comments from './Comments.tsx';
import CommentForm from './CommentForm.tsx';
import useCreateLike from '../hooks/useCreateLike.tsx';
import { LikeData } from '../types/LikeData.ts';
import { toast } from 'react-toastify';
import { ErrorFilter } from '../shared/errorfilter.ts';

const Post = ({ data,isLoggedIn }) => {
  const formattedDate = formatDateTime(data.createdAt);
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const userName = localStorage.getItem('userName');
  const userId = localStorage.getItem('userId')?.toString();
  const [comments, setComments] = useState(data.comments);
  const { sendLike, isLoading, error } = useCreateLike();


  const addNewComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleLike = async () => {

    try {
      if (!isLoggedIn) {
        toast.info('Necessário login')
        return
      }
      const forumPostId = data?._id
      const likeData: LikeData = { forumPostId, userId }
      await sendLike(likeData)
      toast.success('Post curtido :)', { autoClose: 1000 });

    } catch (err) {
      const filteredError = ErrorFilter.shapingResponse(err.response.status);
      toast.info(filteredError);

    }
  }

  const handleCommentClick = () => {
    setShowComments(!showComments);
  }
  return (
    <div className="rounded overflow-hidden shadow-lg p-4 mb-6 text-left flex flex-col">
      <div className="display: flex">
        <p className="text-gray-700 text-xs mr-0.5">criado por:</p>
        <p className="text-custom-blue text-xs font-semibold mr-0.5">
          {data.userName}
        </p>
        <p className="text-gray-700 text-xs mr-0.5">postado em</p>
        <p className="text-custom-blue text-xs font-semibold">
          {formattedDate}
        </p>
      </div>
      <h3 className="font-bold text-custom-blue text-xl my-1 ">
        {data.content.title}
      </h3>
      {data.content.images.length > 0 ?
      <img className='size-96 self-center ' src={data.content.images[0].path}></img> 
      : <></>
      }
        
      <p className="text-gray-700 text-sm">{data.content.message}</p>
      <div className="display: flex justify-between mt-2">
        <p
          onClick={handleLike}
          className="text-red-500 cursor-pointer">❤️ Like</p>
        <div className="display: flex justify-end">
          <p
            className="text-gray-700 text-sm mr-1  hover:underline hover:text-custom-blue cursor-pointer"
            onClick={handleCommentClick}
          >
            {data.comments.length} comentários
          </p>
        </div>
      </div>
      {showComments &&
        comments.map((comment, forumPostId) => (
          <Comments key={comment.id} data={comment} forumPostId={data._id} />
        ))}
      <CommentForm
        postId={data._id}
        userId={userId}
        userName={userName}
        onCommentAdded={addNewComment}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}


export default Post;
