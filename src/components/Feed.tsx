import React, { useState, useEffect } from 'react';
import Post from './Post.tsx';
import usePosts from '../hooks/usePosts.tsx';
import { PostData } from '../types/PostData.ts';

interface FeedProps {
  searchTerm: string;
  isLoggedIn:boolean
}

const Feed: React.FC<FeedProps> = ({ searchTerm,isLoggedIn}) => {
  const [offset, setOffset] = useState(0);
  const limit = 4;
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>([]);
  const { posts, hasMore, loadMore } = usePosts(offset, limit);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = posts.filter((post) => {
      return (
        post.content.title.toLowerCase().includes(lowercasedFilter) ||
        post.content.message.toLowerCase().includes(lowercasedFilter) ||
        post.userName.toLowerCase().includes(lowercasedFilter)
      );
    });
    setFilteredPosts(filteredData);
  }, [searchTerm, posts]);

  const loadMorePosts = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    loadMore(offset, limit);
  };

  return (
    <div className="container mx-auto p-4">
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => <Post data={post} isLoggedIn={isLoggedIn} />)
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
