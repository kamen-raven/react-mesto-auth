import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';

export default function Login(props) {
  return (
    <div className="page">
      <Header />
      <div className="">
        <button className="popup__close-button"
          type="button"
          onClick={props.onClose}>
        </button>
        <div className="popup__content">
          <h2 className="">
            Регистрация
          </h2>
          <form className={`popup__form`}
            name=""
            noValidate
            onSubmit="{}">
            <fieldset className="popup__fieldset">
              <input className="popup__input popup__input_card-add_name"
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
              <span className="popup__input-error"
                id="input-card-name-error">
              </span>
              <input className="popup__input popup__input_card-add_link"
                id="input-card-url"
                type="url"
                name="link"
                placeholder="Пароль"
                autoComplete="off"
                required
                value=""
                onChange="{}" />
              <span className="popup__input-error"
                id="input-card-url-error">
              </span>
            </fieldset>
            <button className="popup__save-button"
              type="submit"
              onClick="{}">
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}
