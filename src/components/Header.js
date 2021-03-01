import React from 'react';
import { Route, Link } from 'react-router-dom';
import logo from '../images/logo.svg';

export default function Header() {
  return (
    <header className="header">
      <img className="header__logo"
            alt="лого Mesto"
            src={logo}
      />
      <Route path="/sing-up">
        <Link className="header__link "
              to="/">
          Войти
        </Link>
      </Route>
      <Route path="/sing-in">
        <Link className="header__link "
              to="/sign-up">
          Регистрация
        </Link>
      </Route>
      <Route exact path="/">
        <p>
          Здесь будет почта
        </p>
        <Link className="header__link header__link_type_exit"
              to="/sign-in">
          Выйти
        </Link>
      </Route>
    </header>
  )
}
