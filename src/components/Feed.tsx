import React, { useState, useEffect } from 'react';
import Post from './Post.tsx';
import usePosts from '../hooks/usePosts.tsx';

const Feed = () => {
  const [offset, setOffset] = useState(0);
  const limit = 4;
  const { posts, hasMore, loadMore } = usePosts(offset, limit);

  const loadMorePosts = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    loadMore(offset, limit);
  };

  return (
    <div className="container mx-auto p-4">
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post._id} data={post} />)
      ) : (
        <p className="text-center text-gray-600">
          Não há postagens para mostrar.
        </p>
      )}
      {hasMore && (
        <button
          onClick={loadMorePosts}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Feed;
