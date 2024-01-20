import React, { useEffect, useCallback } from 'react';
import Post from './Post.tsx';
import usePosts from '../hooks/usePosts.tsx';

const Feed = () => {
  const { posts, hasMore, loadMore } = usePosts();

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        (document.documentElement.offsetHeight * 4) / 5 &&
      hasMore
    ) {
      loadMore();
    }
  }, [hasMore, loadMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="container mx-auto p-4">
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post._id} data={post} />)
      ) : (
        <p className="text-center text-gray-600">
          Não há postagens para mostrar.
        </p>
      )}
      {hasMore && <div className="text-center">Carregando mais posts...</div>}
    </div>
  );
};

export default Feed;
