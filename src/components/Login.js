import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';

export default function Login(props) {
  return (
    <div className="page">
      <Header />
      <section className="">
        <div className="">
          <h2 className="">
            Регистрация
          </h2>
          <form className=""
            name=""
            noValidate
            onSubmit="{}">
            <fieldset className="">
              <input className=""
                id="input-card-name"
                type="email"
                name="email"
                placeholder="Email"
                minLength="2"
                maxLength="30"
                autoComplete="off"
                required
                value=""
                onChange="{}"/>
              <span className=""
                id="input-card-name-error">
              </span>
              <input className=""
                id="input-card-url"
                type="url"
                name="link"
                placeholder="Пароль"
                autoComplete="off"
                required
                value=""
                onChange="{}" />
              <span className=""
                id="input-card-url-error">
              </span>
            </fieldset>
            <button className=""
              type="submit"
              onClick="{}">
              Зарегистрироваться
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}
