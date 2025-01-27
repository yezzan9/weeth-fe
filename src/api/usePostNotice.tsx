import { PostRequestType } from '@/types/PostRequestType';
import axios from 'axios';

const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');
const BASE_URL = import.meta.env.VITE_API_URL;

export const createNotice = async (data: PostRequestType) => {
  const response = await axios.post(`${BASE_URL}/api/v1/admin/notices`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    },
  });
  return response;
};

export default createNotice;
