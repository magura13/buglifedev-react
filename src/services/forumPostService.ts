import axios from 'axios';
import { storage } from '../utils/storage.ts';
import apiInstance from './refreshTokenService.ts';


// const API_URL = 'https://api-typescript-express.onrender.com';

const API_URL ='http://localhost:3001';

export const createPost = async (
  userId: string | null,
  userName: string | null,
  content: {
    title: string
    message: string
    images?: Array<{ sort: number, extension: string, path: string }>
  }
): Promise<any> => {
  const token = storage.getItem('accessToken');
  try {
    const response = await apiInstance.post(
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
  const response = await apiInstance.delete(
    `${API_URL}/forumpost/${forumPostId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
