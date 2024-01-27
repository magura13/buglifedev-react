import React from 'react';

const Comments = ({ data }) => {
  return (
    <div className="my-1" >
      <p className="text-gray-700 text-xxs font-semibold">Samuel:</p>
      <p className="text-gray-700 text-xxs">{data.message}</p>
    </div>
  )
};

export default Comments;
