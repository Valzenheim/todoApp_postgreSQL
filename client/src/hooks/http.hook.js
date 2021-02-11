import { useState, useContext, useCallback } from 'react';
import { AuthContext } from '../Context/AuthContext';

export const useHttp = () => {
  const { token } = useContext(AuthContext);
  const [backError, setBackError] = useState(null);

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    try {
      if (body) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(url, { method, body, headers });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong. Please try again');
      }

      return data;
    } catch (e) {
      setBackError(e.message);
      throw e;
    }
  }, [token]);

  const clearError = useCallback(() => setBackError(null), []);

  return { request, backError, clearError };
};
