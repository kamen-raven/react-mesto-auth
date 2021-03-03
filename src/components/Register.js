import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.js';

export default function Register(props) {
  return (
    <div className="page">
      <Header />
      <section className="auth-page">
        <div className="auth-page__container">
          <h2 className="auth-page__title">
            Регистрация
          </h2>
          <form className="auth-page__form"
                name=""
                noValidate
                onSubmit="{}">
            <fieldset className="auth-page__fieldset">
              <input className="auth-page__input auth-page__input_singup_email"
                      id="input-singup-email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      autoComplete="off"
                      required
                      value=""
                      onChange="{}"/>
              <span className="auth-page__input-error"
                    id="input-singup-email-error">
              </span>
              <input className="auth-page__input auth-page__input_singup_password"
                      id="input-singup-pass"
                      type="password"
                      name="password"
                      placeholder="Пароль"
                      minLength="3"
                      maxLength="18"
                      autoComplete="off"
                      required
                      value=""
                      onChange="{}" />
              <span className="auth-page__input-error"
                    id="input-singup-pass-error">
              </span>
            </fieldset>
            <button className="auth-page__sumbit-button"
                    type="submit"
                    onClick="{}">
              Зарегистрироваться
            </button>
          </form>
          <div className="auth-page__caption-text">
            <p className="auth-page__link-text">
              Уже зарегистрированы?
            </p>
            <Link className="auth-page__link"
                  to="/sing-in">
              Войти
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
