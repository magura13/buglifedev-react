import React from 'react';

const NewsFeed: React.FC = () => {
  const mockNews = [
    { title: 'Novidades da Comunidade', summary: 'Confira as últimas atualizações!' },
    { title: 'NOTÍCIAS', summary: 'Participe do nosso próximo evento online.' },
  ];

  return (
    <div className="news-feed-container p-4">
      {mockNews.map((newsItem, index) => (
        <div key={index} className="news-item bg-white p-4 rounded shadow mb-4">
          <h3 className="font-bold text-lg mb-2">{newsItem.title}</h3>
          <p className="text-gray-700">{newsItem.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
