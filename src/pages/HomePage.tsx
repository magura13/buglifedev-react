import React, { useState } from 'react';
import Feed from '../components/Feed.tsx';
import NewsFeed from '../components/NewsFeed.tsx';
import PostForm from '../components/PostForm.tsx';
import usePosts from '../hooks/usePosts.tsx';
import { useAuth } from '../contexts/authProvider.tsx';

interface HomePageProps {
  searchTerm: string;
  isLogged: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ searchTerm, isLogged }) => {
  const limit = 4;
  const [offset, setOffset] = useState(0);
  const { posts, hasMore, addNewPost } = usePosts(offset, limit);
  const { isAuthenticated } = useAuth();

  const loadMorePosts = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="md:grid md:grid-cols-12 gap-4">
        <div className="col-span-2">
        </div>
        <div className="col-span-8">
          {isAuthenticated && <PostForm addNewPost={addNewPost} />}
          <Feed
            searchTerm={searchTerm}
            isLoggedIn={isLogged}
            posts={posts}
            hasMore={hasMore}
            loadMorePosts={loadMorePosts}
          />
        </div>
        <div className="col-span-2">
          <NewsFeed />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
