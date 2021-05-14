import React from "react";
import closeBtn from '../images/Close_Icon.svg';

function PopupWithForm(props) {

return (

    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`} >
        <div className={`popup__container ${props.container}`}>
            <button  src={closeBtn}
                     alt="Кнопка закрыть"
                     className="popup__close-button"
                     onClick={props.onClose}/>
            <form  className="form"
                   name={props.name}
                   onSubmit={props.onSubmit}
                   id="formProfile"
                   noValidate>
                <h2 className="form__header">{props.title}</h2>
                {props.children}
                <button type="submit" className="form__button">{props.button}</button>
            </form>
        </div>
    </div>

);

}
export default PopupWithForm;