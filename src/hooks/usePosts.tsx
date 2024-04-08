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
        setPosts([...posts, ...fetchedPosts.data]);
        setHasMore(fetchedPosts.hasMore);
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      }
    };
    loadAllPosts();
  }, [offset, limit]);

  function addNewPost(newPost) {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return { posts, hasMore, setPosts, addNewPost };
};

export default usePosts;
