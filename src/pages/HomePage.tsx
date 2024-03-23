import React from 'react';
import Feed from '../components/Feed.tsx';
import NewsFeed from '../components/NewsFeed.tsx';
import PostForm from '../components/PostForm.tsx';

interface HomePageProps {
  searchTerm: string;
  isLogged:boolean;
}

const HomePage: React.FC<HomePageProps> = ({ searchTerm, isLogged }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid md:grid-cols-3 ">
        <div className="md:col-span-2 mx-5 pl-40">
          <PostForm />
          <Feed searchTerm={searchTerm} isLoggedIn={isLogged}/>
        </div>
        <div className="md:col-span-1 mx-5 pr-40">
          <NewsFeed />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
