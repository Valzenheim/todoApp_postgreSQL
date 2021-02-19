import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './Context/AuthContext';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import TodoApp from './Pages/TodoApp/TodoApp';
import pageRoute from './routes';

function App() {
  const { token, userName, login, logout, userId } = useAuth();
  const isAuth = !!token;
  const routes = pageRoute(isAuth);

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
        {isAuth}
        {routes}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

{
  /* <Router> 
<Route path="/public" component={Component1}/>
<Route path="/public" component={Conponent2}/>
<Route path="/public" component={Component2}/>
<PrivateRoute path='/protected' component={Protected} />
</Router> */
}
