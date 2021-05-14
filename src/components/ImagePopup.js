import closeBtn from '../images/Close_Icon.svg';
import React from "react";

function ImagePopup(props) {
    return(
        <div className={`popup popup-image ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container-image">
                <button className="popup__close-button popup__close-button-image"
                        type="button"
                        src={closeBtn}
                        alt="Кнопка закрыть"
                        onClick={props.onClose}
                />
                <img className="popup__image" src={`${props.card.link}`}  alt={props.card.name}/>
                <h3 className="popup__title">{props.card.name}</h3>
            </div>
        </div>
    )
}

export default ImagePopup;