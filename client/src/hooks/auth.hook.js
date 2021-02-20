import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);

  const login = useCallback((jwtToken, id, userLogin) => {
    setUserId(id);
    setToken(jwtToken);
    setUserName(userLogin);

    console.log('@@@@@@@ id:', id);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        token: jwtToken,
        name: userLogin,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUserName(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.userId, data.name);
    }
  }, [login]);

  console.log('@@@@@@@ hook:', userName, token, userId);

  return {
    userName,
    login,
    logout,
    token,
    userId,
  };
};
