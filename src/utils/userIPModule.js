import { useEffect, useState } from 'react';
import axios from 'axios';

export const useUserIP = () => {
  const [loading, setLoading] = useState(true);
  const [userIP, setUserIP] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/get-user-ip')
      .then((response) => {
        setUserIP(response.data.userIpAddress);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user IP:', error);
        setLoading(false);
      });
  }, []);

  return { userIP, loading };
};
