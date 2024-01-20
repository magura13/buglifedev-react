import { useState, useEffect } from 'react';
import { getPosts } from '../services/posts.ts';
import { PostData } from '../types/PostData.ts';

const usePosts = () => {
  const [allPosts, setAllPosts] = useState<PostData[]>([]);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;
  useEffect(() => {
    const loadAllPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setAllPosts(fetchedPosts);
        setPosts(fetchedPosts.slice(0, postsPerPage));
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      }
    };

    loadAllPosts();
  }, []);

  const loadMore = () => {
    const nextPage = currentPage + 1;
    const nextPosts = allPosts.slice(0, nextPage * postsPerPage);
    setPosts(nextPosts);
    setCurrentPage(nextPage);
  };

  const hasMore = posts.length < allPosts.length;

  return { posts, hasMore, loadMore };
};

export default usePosts;
