import closeBtn from '../images/Close_Icon.svg';
import React from "react";

function InfoTooltip ({onClose, isOpen, message}) {

    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <img src={message.iconPath} alt="" className="popup__result-icon" />
                <p className="popup__title-info">{message.text}</p>
                <button type="button"
                        src={closeBtn}
                        alt="Кнопка закрыть"
                        className="popup__close-button" onClick={onClose} />
            </div>
        </div>
    );
}

export default InfoTooltip ;