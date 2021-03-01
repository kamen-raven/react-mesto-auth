import React from 'react';
import logo from '../images/logo.svg';

export default function Header() {
  return (
    <header className="header">
      <img className="header__logo"
            alt="лого Mesto"
            src={logo}
      />
    </header>
  )
}
