import React from 'react';


export default function Login(props) {
  //стейт почты пользователя

  //стейт пароля





  return (
    <div className="page">
      <section className="auth-page">
        <div className="auth-page__container">
          <h2 className="auth-page__title">
            Вход
          </h2>
          <form className="auth-page__form"
                name=""
                noValidate
                onSubmit="{}">
            <fieldset className="auth-page__fieldset">
              <input className="auth-page__input auth-page__input_login_email"
                      id="input-login-email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      autoComplete="off"
                      required
                      value=""
                      onChange="{}"/>
              <span className="auth-page__input-error"
                    id="input-login-email-error">
              </span>
              <input className="auth-page__input auth-page__input_login_password"
                      id="input-login-pass"
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
                    id="input-login-pass-error">
              </span>
            </fieldset>
            <button className="auth-page__sumbit-button"
                    type="submit"
                    onClick="{}">
              Войти
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
