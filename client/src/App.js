import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './Context/AuthContext';
import { pageRoute } from './routes';

function App() {
  const { token, userName, login, logout, userId } = useAuth();
  const isAuth = !!token;
  const routes = pageRoute(isAuth);

  console.log('@@@@@@@ userIdApp:', userId);

  return (
    <AuthContext.Provider
      value={{
        token,
        userName,
        login,
        logout,
        userId,
        isAuth,
      }}
    >
      <Router>
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
