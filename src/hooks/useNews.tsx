import { useState, useEffect } from 'react';
import { getNews } from '../services/newsService.ts';

interface NewsData {
  _id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

const useNews = (limit: number) => {
  const [news, setNews] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsData = await getNews();
        const shuffledNews = newsData.sort(() => 0.5 - Math.random());
        const selectedNews = shuffledNews.slice(0, limit);
        setNews(selectedNews);
      } catch (error) {
        console.error('Erro ao buscar notícias:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [limit]);

  return { news, loading };
};

export default useNews;
