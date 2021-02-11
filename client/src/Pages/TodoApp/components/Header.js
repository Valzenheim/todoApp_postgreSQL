import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import logout from '../../../images/sign-out-alt-solid.svg';

export default function Header() {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  };

  return (
    <div className="header">
      <strong>{auth.userName}</strong>
      <div className="logoutBtn" role="button" aria-hidden="true" onClick={logoutHandler}>
        <img src={logout} alt={logout}/>
      </div>
    </div>
  );
}
