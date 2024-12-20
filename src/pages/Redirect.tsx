import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const Redirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');

    if (code) {
      axios
        .post(
          `${BASE_URL}/api/v1/users/social-login`,
          { authCode: code },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then((res) => {
          const { accessToken, refreshToken } = res.data.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          if (res.data.message === '소셜 로그인에 성공했습니다.') {
            navigate('/home');
          } else {
            navigate('/signup');
          }
        });
    }
  }, [navigate]);

  return <div />;
};

export default Redirect;
