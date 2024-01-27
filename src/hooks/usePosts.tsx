import { useState, useEffect } from 'react';
import { getPosts } from '../services/posts.ts';
import { PostData } from '../types/PostData.ts';

const usePosts = (offset, limit) => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadAllPosts = async () => {
      try {
        const fetchedPosts = await getPosts(offset, limit);
        setPosts(fetchedPosts.data);
        setHasMore(fetchedPosts.hasMore);
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      }
    };
    loadAllPosts();
  }, []);
  const loadMore = async (newOffset, newLimit) => {
    try {
      const fetchedPosts = await getPosts(newOffset, newLimit);
      setPosts([...posts, ...fetchedPosts.data]);
      setHasMore(fetchedPosts.hasMore);
    } catch (error) {
      console.error('Erro ao buscar mais posts:', error);
    }
  };

  return { posts, hasMore, loadMore };
};

export default usePosts;
