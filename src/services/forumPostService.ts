import axios from 'axios';
import { storage } from '../utils/storage.ts';

const API_URL = 'http://localhost:8000';

export const createPost = async (
  userId: string | null,
  userName: string | null,
  content: {
    title: string
    message: string
  }
): Promise<any> => {
  const token = storage.getItem('accessToken');
  try {
    const response = await axios.post(
      `${API_URL}/forumpost/`,
      { userId, userName, content },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (err) {
    throw err
  }
};

export const deletePost = async (
  forumPostId: string | null
): Promise<any> => {
  const token = storage.getItem('accessToken');
  const response = await axios.delete(
    `${API_URL}/forumpost/${forumPostId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
