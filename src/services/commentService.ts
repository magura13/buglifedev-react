import axios from 'axios';
import { storage } from '../utils/storage.ts';

const API_URL = 'https://api-typescript-express.onrender.com';

export const createComment = async (
  postId: string,
  userId: string,
  message: string
): Promise<any> => {
  const token = storage.getItem('accessToken');
  const response = await axios.post(
    `${API_URL}/forumpost/${postId}/comments`,
    { userId, message },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
