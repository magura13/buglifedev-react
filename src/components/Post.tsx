import React from 'react';
import formatDateTime from '../shared/dateFormatter';

const Post = ({ data }) => {
  const formattedDate = formatDateTime(data.createdAt);

  return (
    <div className="rounded overflow-hidden shadow-lg p-4 mb-6 text-left">
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
      {data.comments.length > 0 ? (
        data.comments.map((comment) => <p className="text-gray-700 text-xxs">{comment.message}</p>)
      ) : (
        <p className="text-center text-gray-600">
          Não há postagens para mostrar.
        </p>
      )}
    </div>
  );
};

export default Post;
