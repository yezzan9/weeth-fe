/* eslint-disable react/require-default-props */
import { useEffect, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { MonthlyScheduleContext } from './MonthlyScheduleContext';

const MonthlyScheduleAPI = ({ start = '', end = '' }) => {
  const { setMonthScheduleData, setError } = useContext(MonthlyScheduleContext);

  useEffect(() => {
    if (!start || !end) return;

    const fetchData = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      const BASE_URL = process.env.REACT_APP_BASE_URL;

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        Authorization_refresh: `Bearer ${refreshToken}`,
      };
      const params = {
        start,
        end,
      };

      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/schedules/monthly`,
          {
            headers,
            params,
          },
        );

        if (response.data.code === 200) {
          console.log('월별 조회', response.data.data); // 데이터 확인용
          setMonthScheduleData(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error('월별 조회 에러', err); // 에러 로그
        setError('An error occurred while fetching the data');
      }
    };

    fetchData();
  }, [setMonthScheduleData, setError, start, end]);

  return null;
};

MonthlyScheduleAPI.propTypes = {
  start: PropTypes.string,
  end: PropTypes.string,
};

export default MonthlyScheduleAPI;
