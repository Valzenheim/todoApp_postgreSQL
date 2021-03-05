import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);

  const login = useCallback((jwtToken, userLogin) => {
    setToken(jwtToken);
    setUserName(userLogin);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        token: jwtToken,
        name: userLogin,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserName(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.name);
    }
  }, [login]);

  return {
    userName,
    login,
    logout,
    token,
  };
};
