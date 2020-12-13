import React from 'react';
import { Link } from 'react-router-dom';
import { isUserAuthenticated, deleteCookie } from '../../utils/cookie';

const Header = () => {
  const listMenu = ['home', 'profile', 'contact', 'infoCorona', 'product'];

  const logout = () => {
    deleteCookie('userData');
    deleteCookie('token');
    window.location.replace('/login');
  };
  return (
    <div className="header">
      {listMenu.map((name) => {
        return (
          <Link to={`/${name}`} key={name}>
            <div className="menu">{name}</div>
          </Link>
        );
      })}
      {isUserAuthenticated() ? (
        <span
          className="menu text-white"
          onClick={() => {
            logout();
          }}
        >
          logout
        </span>
      ) : (
        <div />
      )}
    </div>
  );
};
export default Header;
