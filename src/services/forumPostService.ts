import axios from 'axios';
import { storage } from '../utils/storage.ts';
import apiInstance from './refreshTokenService.ts';

export const createPost = async (
  userId: string | null,
  userName: string | null,
  content: {
    title: string;
    message: string;
    images?: Array<{ sort: number; extension: string; path: string }>;
  }
): Promise<any> => {
  const token = storage.getItem('accessToken');
  try {
    const response = await apiInstance.post(
      `/forumpost/`,
      { userId, userName, content },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const deletePost = async (forumPostId: string | null): Promise<any> => {
  const token = storage.getItem('accessToken');
  const response = await apiInstance.delete(`/forumpost/${forumPostId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
