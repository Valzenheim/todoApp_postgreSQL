import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import TodoApp from './Pages/TodoApp/TodoApp';

export const pagination = (isAuth) => {
  // if (isAuth) {
  return (
    <Switch>
      <Route path="/todo_app" exact>
        <TodoApp />
      </Route>
      <Redirect to="/todo_app" />
    </Switch>
  );
  // }

  // return (

  //   <Switch>
  //     <Route path="/sign_in" exact>
  //       <LoginPage />
  //     </Route>
  //     <Route path="/register">
  //       <RegisterPage />
  //     </Route>
  //     <Redirect to="/sign_in" />
  //   </Switch>

  // );
};
