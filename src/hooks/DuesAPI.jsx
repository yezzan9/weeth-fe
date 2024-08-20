import { useEffect, useContext } from 'react';
import axios from 'axios';
import { DuesContext } from './DuesContext';
import Utils from './Utils';

const DuesAPI = () => {
  const {
    myCardinal,
    setDuesData,
    setTotalAmount,
    setCurrentAmount,
    setCardinal,
    setTime,
  } = useContext(DuesContext);

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  useEffect(() => {
    const fetchDuesData = async () => {
      try {
        const cardinal = 3;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          Authorization_refresh: `Bearer ${refreshToken}`,
        };
        const BASE_URL = process.env.REACT_APP_BASE_URL;

        const originalApiFunc = (funcCardinal) =>
          axios.get(`${BASE_URL}/api/v1/account/${funcCardinal}`, { headers });

        // API 호출을 Utils로 처리
        const response = await Utils(
          await originalApiFunc(cardinal),
          originalApiFunc,
          [cardinal],
        );

        const result = response.data;

        if (result.code === 200) {
          if (result.data.cardinal !== myCardinal) {
            setDuesData(result.data.receipts);
            setTotalAmount(result.data.totalAmount);
            setCardinal(result.data.cardinal);
            setCurrentAmount(result.data.currentAmount);
            setTime(result.data.time);
            // console.log(result);
          }
        } else {
          console.error('Failed to get data:', result.message);
        }
      } catch (error) {
        // 무한 리다이렉션 방지
        if (window.location.pathname !== '/login') {
          console.error('An error occurred while fetching the data');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
      }
    };

    fetchDuesData(); // 비동기 함수를 호출
  }, [
    accessToken,
    myCardinal,
    setDuesData,
    setTotalAmount,
    setCurrentAmount,
    setCardinal,
    setTime,
  ]);

  return null;
};

export default DuesAPI;
