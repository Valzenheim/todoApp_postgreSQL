import { useState, useContext, useCallback } from 'react';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';

export const useHttp = () => {
  const { token } = useContext(AuthContext);
  const [backError, setBackError] = useState(null);

  const request = useCallback(
    async (
      resUrl,
      resMethod = 'GET',
      resParams,
      body = null,
      resHeaders = {}
    ) => {
      try {
        if (body) {
          body = JSON.stringify(body);
          resHeaders['Content-Type'] = 'application/json';
        }

        if (token) {
          resHeaders.Authorization = `Bearer ${token}`;
        }

        const response = await axios({
          method: resMethod,
          url: resUrl,
          data: body,
          headers: resHeaders,
          params: resParams,
        });

        if (response.status !== 200) {
          throw new Error(
            response.message || 'Something went wrong. Please try again'
          );
        }

        return response.data;
      } catch (e) {
        setBackError(e.message);
        throw e;
      }
    },
    [token]
  );

  const clearError = useCallback(() => setBackError(null), []);

  return { request, backError, clearError };
};
