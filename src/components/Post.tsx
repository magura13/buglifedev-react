import React, { useState } from 'react';
import formatDateTime from '../shared/dateFormatter';
import Comments from './Comments';

const Post = ({ data }) => {
  const formattedDate = formatDateTime(data.createdAt);
  const [showComments,setShowComents] = useState(false)

  const handleCommentClick = ()  => {
    if (showComments) {
      setShowComents(false)
    } else
    setShowComents(true)

    console.log(showComments)
  }

  return (
    <div className="rounded overflow-hidden shadow-lg p-4 mb-6 text-left flex flex-col">
      <div className="display: flex">
        <p className="text-gray-700 text-xs mr-0.5">criado por:</p>
        <p className="text-custom-blue font-bold text-xs font-semibold mr-0.5">
          {data.userName}
        </p>
        <p className="text-gray-700 text-xs mr-0.5">postado em</p>
        <p className="text-custom-blue font-bold text-xs font-semibold">
          {formattedDate}
        </p>
      </div>
      <h3 className="font-bold text-custom-blue text-xl my-1 ">
        {data.content.title}
      </h3>
      <p className="text-gray-700 text-sm">{data.content.message}</p>
      <div className="display: flex justify-end" >
        <p className="text-gray-700 text-sm mr-1  hover:underline hover:text-custom-blue cursor-pointer" onClick={handleCommentClick}>{data.comments.length} comentários</p>
      </div>
      {showComments ? (
        data.comments.map((comments) => <Comments data={comments} />)
      ) : (
          null
      )}
    </div>
  );
};

export default Post;
