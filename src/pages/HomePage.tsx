import React, { useState } from 'react';
import Feed from '../components/Feed.tsx';
import NewsFeed from '../components/NewsFeed.tsx';
import PostForm from '../components/PostForm.tsx';
import usePosts from '../hooks/usePosts.tsx';

interface HomePageProps {
  searchTerm: string;
  isLogged: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ searchTerm, isLogged }) => {
  const limit = 4
  const [offset, setOffset] = useState(0);
  const { posts, hasMore, addNewPost} = usePosts(offset, limit);

  const loadMorePosts = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
  };

 
  return (
    <div className="container mx-auto p-4">
      <div className="grid md:grid-cols-3 ">
        <div className="md:col-span-2 mx-5 pl-40">
          <PostForm addNewPost={addNewPost}/>
          <Feed 
          searchTerm={searchTerm} 
          isLoggedIn={isLogged} 
          posts={posts}
          hasMore={hasMore}
          loadMorePosts={loadMorePosts}
           />
        </div>
        <div className="mclera
        d:col-span-1 mx-5 pr-40">
          <NewsFeed />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
