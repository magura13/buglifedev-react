import axios from 'axios';

const API_URL = 'https://api-typescript-express.onrender.com'


export const getServiceUrl = async (
  imgName,
  contentType
) => {
  // const token = storage.getItem('accessToken');
  try {
    const response = await axios.post(
      `${API_URL}/api/s3/signed_url`,
      { key:imgName,content_type:contentType },
      // { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (err) {
    err.response = {status:501}
    throw err
  }
};

export const uploadImage = async (
        uploadUrl,file
  ) => {
    // const token = storage.getItem('accessToken');
    try {
      const response = await axios.putForm(
        uploadUrl,
        file,
        // { headers: { Authorization: `Bearer ${token}` } }
      );

      return response.status;
    } catch (err) {
      throw err
    }
  }

