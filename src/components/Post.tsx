import React from 'react';

const Post = ({ data }) => {
  return (
    <div className="rounded overflow-hidden shadow-lg p-4 mb-6 text-left">
      <div className="display: flex">
        <p className="text-gray-700 text-xs mr-0.5">Created by:</p>
        <p className="text-gray-700 font-bold text-xs font-semibold">Titico Lelis el matador</p>
      </div>    
      <h3 className="font-bold text-custom-blue text-xl mb-2 ">{data.content.title}</h3>
      <p className="text-gray-700 text-base">{data.content.message}</p>
      <p className="text-gray-700 text-base">{data.comments.message}</p>
    </div>
  );
};

export default Post;

//removi ->   /*<p className="text-gray-700 text-base">{data.content.subject}</p>*/ 