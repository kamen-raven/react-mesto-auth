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
      <ul class="header__list">
          <Route exact path="/sing-up">
            <li class="header__links">
              <Link className="header__link "
                    to="/">
                  Войти
              </Link>
            </li>
          </Route>
          <Route exact path="/sing-in">
            <li class="header__links">
              <Link className="header__link "
                    to="/sign-up">
                  Регистрация
              </Link>
            </li>
          </Route>
          <Route exact path="/">
            <li class="header__links header__link_type_email">
                sample@email.com
            </li>
            <li class="header__links">
              <Link className="header__link header__link_type_exit"
                    to="/sign-in">
                  Выйти
              </Link>
            </li>
          </Route>
      </ul>
    </header>
  )
}
