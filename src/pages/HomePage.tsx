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
  const [showForm, setShowForm] = useState(false);

  const loadMorePosts = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="md:hidden mb-4">
        {isAuthenticated && (
          <button
            onClick={toggleForm}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <span className="mr-2">{showForm ? '-' : '+'}</span>
            Postar
          </button>
        )}
        {showForm && <PostForm addNewPost={addNewPost} />}
      </div>
      <div className="md:grid md:grid-cols-12 gap-4">
        <div className="col-span-2"></div>
        <div className="col-span-8">
          {isAuthenticated && (
            <div className="hidden md:block">
              <PostForm addNewPost={addNewPost} />
            </div>
          )}
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
