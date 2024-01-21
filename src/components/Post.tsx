import React from 'react';

const Post = ({ data }) => {
  return (
    <div className="rounded overflow-hidden shadow-lg p-4 mb-6">
      <h3 className="font-bold text-xl mb-2">{data.content.title}</h3>
      <p className="text-gray-700 text-base">{data.content.subject}</p>
      <p className="text-gray-700 text-base">{data.content.message}</p>
      <p className="text-gray-700 text-base">{data.comments.message}</p>
    </div>
  );
};

export default Post;
