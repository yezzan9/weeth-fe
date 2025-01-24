import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

interface Comments {
  id: number;
  name: string;
  content: string;
  time: string;
  position: string;
  role: string;
}

interface FileUrls {
  fileId: number;
  fileName: string;
  fileUrl: string;
}

interface BoardDetail {
  id: number;
  name: string;
  title: string;
  time: string;
  content: string;
  position: string;
  role: string;
  commentCount: number;
  comments: Comments[];
  fileUrls: FileUrls[];
}

const getBoardDetail = async (path: string, id: number) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return axios.get(`${BASE_URL}/api/v1/${path}/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    },
  });
};

export const useGetBoardDetail = (
  path: string,
  id: number,
  refreshKey: number,
) => {
  console.log('호출');
  const [boardDetailInfo, setBoardDetail] = useState<BoardDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoardDetail = async () => {
      try {
        const response = await getBoardDetail(path, id);
        const { data } = response.data;
        console.log(data);

        // children이 undefined면 빈 배열로 변환
        const formattedComments = data.comments.map((comment: any) => ({
          ...comment,
          children: comment.children ?? [],
        }));

        setBoardDetail({
          ...data,
          comments: formattedComments,
        });
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message);
      }
    };

    fetchBoardDetail();
  }, [path, id, refreshKey]);

  return { boardDetailInfo, error };
};

export default useGetBoardDetail;
