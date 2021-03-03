import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import logo from '../images/logo.svg';

export default function Header() {
  return (
    <header className="header">
      <img className="header__logo"
        alt="лого Mesto"
        src={logo}
      />
      <ul className="header__list">
        <Switch>
          <Route exact path="/sing-up">
            <li className="header__links">
              <Link className="header__link "
                    to="/">
                  Войти
              </Link>
            </li>
          </Route>
          <Route exact path="/sing-in">
            <li className="header__links">
              <Link className="header__link "
                    to="/sign-up">
                  Регистрация
              </Link>
            </li>
          </Route>
          <Route exact path="/">
            <li className="header__links header__link_type_email">
                sample@email.com
            </li>
            <li className="header__links">
              <Link className="header__link header__link_type_exit"
                    to="/sign-in">
                  Выйти
              </Link>
            </li>
          </Route>
        </Switch>
      </ul>
    </header>
  )
}
