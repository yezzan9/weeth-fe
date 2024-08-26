import { useEffect, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { EventInfoContext } from './EventInfoContext';

const EventInfoAPI = ({ id }) => {
  const { setInfoData, setError } = useContext(EventInfoContext);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    };
    const fetchData = async () => {
      try {
        if (id) {
          const response = await axios.get(`${BASE_URL}/api/v1/events/${id}`, {
            headers,
          });
          if (response.data.code === 200) {
            setInfoData(response.data.data);
            // console.log(response);
          } else {
            setError(response.data.message);
            // console.log(response);
          }
        }
      } catch (err) {
        setError('An error occurred while fetching the data');
      }
    };

    fetchData();
  }, [id]);

  return null;
};

EventInfoAPI.propTypes = {
  id: PropTypes.number.isRequired,
};

export default EventInfoAPI;
