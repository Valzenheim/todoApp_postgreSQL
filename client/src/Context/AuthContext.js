import { createContext } from 'react';

function noop() {}

export const AuthContext = createContext({
  token: null,
  userName: null,
  userId: 1,
  login: noop,
  logout: noop,
  isAuth: false,
});
