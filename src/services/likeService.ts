import axios from 'axios';
import { storage } from '../utils/storage.ts';
import {LikeData} from '../types/LikeData.ts'
import apiInstance from './refreshTokenService.ts';


export const createLike = async (
    LikeData:LikeData
): Promise<Response> => {
  const token = storage.getItem('accessToken');
  const response = await apiInstance.post(
    `/like/${LikeData.forumPostId}/${LikeData.userId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data.response;
};

export const deleteLike = async (
    LikeData:LikeData
): Promise<any> => {
  const token = storage.getItem('accessToken');
  const response = await apiInstance.delete(
    `/like/${LikeData.forumPostId}/${LikeData.userId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
