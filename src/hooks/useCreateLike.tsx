import { LikeData } from '../types/LikeData.ts';
import { useState } from 'react';
import { createLike, deleteLike } from '../services/likeService.ts';

const useCreateLike = () => {
  const sendLike = async (LikeData: LikeData) => {
    try {
      const response = await createLike(LikeData);
      return response;
    } catch (err) {
      throw err;
    }
  };

  const sendDeleteLike = async (LikeData: LikeData) => {
    try {
      const response = await deleteLike(LikeData);
      return response;
    } catch (err) {
      throw err;
    }
  };

  return { sendLike, sendDeleteLike };
};

export default useCreateLike;
