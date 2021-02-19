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

function App() {
  const { token, userName, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        token,
        userName,
        login,
        logout,
        userId,
        isAuthenticated,
      }}
    >
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              if (!token) {
                return <TodoApp />;
              } else {
                return <LoginPage />;
              }
            }}
          />

          <Route path="/register" component={RegisterPage} />

          <Redirect to="/" />
        </Switch>
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
