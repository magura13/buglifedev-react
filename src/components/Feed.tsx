import React, { useState, useEffect } from 'react';
import Post from './Post.tsx';
import usePosts from '../hooks/usePosts.tsx';
import { PostData } from '../types/PostData.ts';

interface FeedProps {
  searchTerm: string;
  isLoggedIn: boolean;
  posts: any;
  hasMore: boolean;
  loadMorePosts: any
}

const Feed: React.FC<FeedProps> = ({
  searchTerm,
  isLoggedIn,
  posts,
  hasMore,
  loadMorePosts
}) => {

  const [offset, setOffset] = useState(0);
  const limit = 4;
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>([]);

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

  return (
    <div className="container mx-auto p-4">
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <Post key={post._id} data={post} isLoggedIn={isLoggedIn} />
        ))
      ) : (
        <p className="text-center text-gray-600">
          Não há postagens para mostrar.
        </p>
      )}
      {hasMore && (
        <button
          onClick={() => loadMorePosts()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Feed;
