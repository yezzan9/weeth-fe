import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import Utils from './Utils';

const UserAPI = () => {
  const { setUserData, setError, setAllUserData } = useContext(UserContext);

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    };

    const fetchUserData = async () => {
      try {
        const originalApiFuncUser = () =>
          axios.get(`${BASE_URL}/api/v1/users`, { headers });

        const userResponse = await Utils(
          await originalApiFuncUser(),
          originalApiFuncUser,
          []
        );

        if (userResponse.data.code === 200) {
          setUserData(userResponse.data.data);
        } else {
          setError(userResponse.data.message);
        }
      } catch (err) {
        // 무한 리다이렉션 방지
        if (window.location.pathname !== '/login') {
          setError('An error occurred while fetching the data');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
      }
    };

    const fetchAllUsersData = async () => {
      try {
        const originalApiFuncAllUsers = () =>
          axios.get(`${BASE_URL}/api/v1/users/all`, { headers });

        const allUsersResponse = await Utils(
          await originalApiFuncAllUsers(),
          originalApiFuncAllUsers,
          []
        );

        if (allUsersResponse.data.code === 200) {
          setAllUserData(allUsersResponse.data.data);
        } else {
          setError(allUsersResponse.data.message);
        }
      } catch (err) {
        // 무한 리다이렉션 방지
        if (window.location.pathname !== '/login') {
          setError('An error occurred while fetching the data');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
      }
    };

    fetchUserData();
    fetchAllUsersData();
  }, [accessToken, setUserData, setError, setAllUserData, BASE_URL]);

  return null;
};

export default UserAPI;
