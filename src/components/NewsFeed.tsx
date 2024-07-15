import React from 'react';
import useNews from '../hooks/useNews.tsx';

const NewsFeed: React.FC = () => {
  const { news, loading } = useNews(4);
  if (loading) {
    return <div>Carregando notícias...</div>;
  }

  return (
    <div className="news-feed-container p-4">
      {news.map((newsItem) => (
        <div
          key={newsItem._id}
          className="news-item bg-white p-4 rounded shadow mb-4"
        >
          <h3 className="font-bold text-lg mb-2">{newsItem.title}</h3>
          <p className="text-gray-700 mb-4">{newsItem.description}</p>
          <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
            <img
              src={newsItem.urlToImage}
              alt={newsItem.title}
              className="w-full h-auto rounded"
            />
          </a>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
