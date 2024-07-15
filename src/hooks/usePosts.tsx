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

        const isArray = Array.isArray(fetchedPosts.forumPosts);

        if (Array.isArray(fetchedPosts.forumPosts)) {
          setPosts([...posts, ...fetchedPosts.forumPosts]);
        } else {
          console.error(
            'fetchedPosts.forumPosts is not an array:',
            fetchedPosts.forumPosts
          );
        }

        setHasMore(fetchedPosts.hasMore);
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      }
    };

    loadAllPosts();
  }, [offset, limit]);

  function addNewPost(newPost) {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  }

  return { posts, hasMore, setPosts, addNewPost };
};

export default usePosts;
