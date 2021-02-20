import { useState, useContext, useCallback } from 'react';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';

export const useHttp = () => {
  const { token } = useContext(AuthContext);
  const [backError, setBackError] = useState(null);

  const request = useCallback(
    async (resUrl, resMethod = 'GET', body = null, resHeaders = {}) => {
      try {
        if (body) {
          body = JSON.stringify(body);
          resHeaders['Content-Type'] = 'application/json';
        }

        if (token) {
          resHeaders.Authorization = `Bearer ${token}`;
        }

        const resp = await axios({
          method: resMethod,
          url: resUrl,
          data: body,
          headers: resHeaders,
        });

        return resp.data;
      } catch (e) {
        console.log('@@@@@@@ error:', e.response);
        setBackError(
          e.response.data.message || 'Something went wrong. Please try again'
        );
        throw e;
      }
    },
    [token]
  );

  const clearError = useCallback(() => setBackError(null), []);

  return { request, backError, clearError };
};
