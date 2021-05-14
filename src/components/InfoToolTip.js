import React from 'react';
import closeBtn from '../images/Close_Icon.svg';

function InfoToolTip(props) {
    return (
        <div className={`popup ${props.isOpen && 'popup_opened'}`} onClick={props.overlayClose}>
            <form className="popup__container popup__notification" name="popup_notification">
                <button className="popup__close" type="button" onClick={props.onClose}></button>
                <img className="popup__image-notification" src={props.src} alt="Уведомление"/>
                <h2 className="popup__title popup__title-notification">{props.title}</h2>
            </form>
        </div>
    )
}

export default InfoToolTip;