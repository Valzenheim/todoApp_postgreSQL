import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import { pagination } from './routes';
import { AuthContext } from './Context/AuthContext';

function App() {
  const {
    token, userName, login, logout, userId,
  } = useAuth();
  const isAuthenticated = !!token;
  const routes = pagination(isAuthenticated);

  return (
    <AuthContext.Provider value={{
      token, userName, login, logout, userId, isAuthenticated,
    }}
    >
      <Router>
        { isAuthenticated }
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
