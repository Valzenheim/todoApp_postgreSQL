import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import TodoApp from './Pages/TodoApp/TodoApp';

export const pageRoute = (isAuth) => {
  if (isAuth) {
    return (
      <Switch>
        <Route path="/todoApp" exact>
          <TodoApp />
        </Route>
        <Redirect to="/todoApp" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/login" exact>
        <LoginPage />
      </Route>
      <Route path="/register">
        <RegisterPage />
      </Route>
      <Redirect to="/login" />
    </Switch>
  );
};
