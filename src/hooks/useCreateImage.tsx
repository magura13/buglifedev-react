import { useState } from 'react';
import { getServiceUrl, uploadImage } from '../services/createImgService.ts'
import { upload } from '@testing-library/user-event/dist/upload';
const useCreateImage = () => {

  const getURL = async (
    imgName,
    contentType
  ) => {

    try {
      const response = await getServiceUrl(imgName, contentType);
      return response;
    } catch (err) {
      throw err
    }
  };
  const sendImage = async (url, file) => {
    try {
      await uploadImage(url, file)
      return { getURL };
    } catch (err) {
      throw err
    }

  }

  return { getURL, sendImage};
};

export default useCreateImage