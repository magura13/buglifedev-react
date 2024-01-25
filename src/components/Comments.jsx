import React from 'react';

const Comments = ({ data }) => {
  return <p className="text-gray-700 text-xxs">{data.message}</p>;
};

export default Comments;
