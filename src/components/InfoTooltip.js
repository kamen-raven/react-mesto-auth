import React from 'react';
import iconFail from "../images/registration-fail.svg";
import iconSucces from "../images/registration-succes.svg";

export default function InfoTooltip(props) {
  return (
    <div className={`popup popup_opened ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_create_info-tooltip">
        <button className="popup__close-button"
                type="button"
                onClick={props.onClose}>
        </button>
        <div className="popup__content">
          <img className="popup__info-tooltip-icon"
                src={iconSucces} />
          <h2 className="popup__title popup__title_info-tooltip">
          Вы успешно зарегистрировались!
          </h2>
        </div>
      </div>
    </div>
  )
}
