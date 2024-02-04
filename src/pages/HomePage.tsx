import React from 'react';
import Feed from '../components/Feed.tsx';
import NewsFeed from '../components/NewsFeed.tsx';

interface HomePageProps {
  searchTerm: string;
}

const HomePage: React.FC<HomePageProps> = ({ searchTerm }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid md:grid-cols-3 ">
        <div className="md:col-span-2 mx-5 pl-40">
          <Feed searchTerm={searchTerm} />
        </div>
        <div className="md:col-span-1 mx-5 pr-40">
          <NewsFeed />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
