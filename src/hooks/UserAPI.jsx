import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

// 일단 빨리 연결 하고 싶어서 eslintigonre에 넣고 에러 다 무시하고 했습니다,,

/* 
api에서 받아오는 data 내용 예시
{
    "id": 2,
    "name": "이유진",
    "studentId": "1",
    "tel": "010-0101-0101",
    "department": "SW",
    "email": "lee@gmail.com",
    "cardinals": [3],
    "position": "FE"
}
다른데서 사용 할 때 

const { userData, error } = useContext(UserContext);
이거 가져오고
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }
이렇게 에러 처리 해준 뒤

userData.name 이런식으로 data 사용하면 됩니당!!
*/

const UserAPI = () => {
  const { setUserData, setError } = useContext(UserContext);

  const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

  useEffect(() => {
    console.log("Access Token:", ACCESS_TOKEN);

    const headers = {
      // 일단 현재는 access token만 넣었는데 나중에 refresh 토큰도 넣어야 합니다
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    };

    axios
      .get('http://13.125.78.31:8080/users', { headers })
      .then((response) => {
        if (response.data.code === 200) {
          setUserData(response.data.data);
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        setError('An error occurred while fetching the data');
      });
  }, [ACCESS_TOKEN, setUserData, setError]);

  return null; 
};

export default UserAPI;