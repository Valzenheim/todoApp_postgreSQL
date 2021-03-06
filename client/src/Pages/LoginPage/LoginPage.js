import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';
import './style/LoginStyle.css';
import { AuthContext } from '../../Context/AuthContext';

export default function LoginPage() {
  const auth = useContext(AuthContext);
  const { request, backError, clearError } = useHttp();
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: '',
    password: '',
  });

  const changeHandler = (event) => {
    return setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginHandler = async () => {
    clearError();

    if (
      !/[0-9a-zA-Zа-яёА-ЯЁ]/i.test(form.name) &&
      !/[0-9a-zA-Zа-яёА-ЯЁ]/i.test(form.password)
    ) {
      return setError('Wrong user data. Please try again');
    }

    const data = await request('/api/login', 'post', form);

    auth.login(data.token, data.userName);

    return setForm({
      ...form,
      name: '',
      password: '',
    });
  };

  return (
    <div className="registerHolder">
      <div className="appName">
        <strong>TODO</strong>
      </div>
      <div
        className="loginPage"
        role="button"
        aria-hidden="true"
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            loginHandler();
          }
        }}
      >
        <div className="pageHeader">sign in</div>
        <input
          type="text"
          placeholder="login"
          name="name"
          value={form.name}
          className="inputForm"
          onChange={changeHandler}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={form.password}
          className="inputForm"
          onChange={changeHandler}
        />
        <Link to="/register">
          <button type="button" className="btn">
            registration
          </button>
        </Link>
        <button type="button" className="btn" id="btn1" onClick={loginHandler}>
          log in
        </button>
      </div>
      <div className="errorHolder">{backError || error}</div>
    </div>
  );
}
