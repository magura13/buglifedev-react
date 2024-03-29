import { useState, useEffect } from 'react';
import { getPosts } from '../services/forumPosts.ts';
import { PostData } from '../types/PostData.ts';

const usePosts = (offset, limit) => {
  const [posts, setPosts] = useState([]);
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
  }, [posts]);

  function  addNewPost (newPost) {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };


  const loadMore = async (newOffset, newLimit) => {
    try {
      const fetchedPosts = await getPosts(newOffset, newLimit);
      setPosts([...posts, ...fetchedPosts.data]);
      setHasMore(fetchedPosts.hasMore);
    } catch (error) {
      console.error('Erro ao buscar mais posts:', error);
    }
  };

  return { posts, hasMore, loadMore, setPosts ,addNewPost};
};

export default usePosts;
