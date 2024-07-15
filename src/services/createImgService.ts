import axios from 'axios';
import apiInstance from './refreshTokenService.ts';

export const getServiceUrl = async (imgName, contentType) => {
  // const token = storage.getItem('accessToken');
  try {
    const response = await apiInstance.post(
      `/api/s3/signed_url`,
      { key: imgName, content_type: contentType }
      // { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (err) {
    err.response = { status: 501 };
    throw err;
  }
};

export const uploadImage = async (uploadUrl, file) => {
  // const token = storage.getItem('accessToken');
  try {
    const response = await axios.putForm(
      uploadUrl,
      file
      // { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.status;
  } catch (err) {
    throw err;
  }
};
