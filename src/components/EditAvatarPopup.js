import PopupWithForm from "./PopupWithForm.js";
import React from "react";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({ avatar: avatarRef.current.value })
    }

    return(
        <PopupWithForm name="avatarPopup"
                       title="Обновить аватар"
                       button="Сохранить"
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmit}
                       container="popup__container-avatar"
        >
            <input id="avatar" type="url" className="form__name" name="avatar__link" placeholder="Ссылка на картинку" ref={avatarRef} required/>
            <span id="avatar-error" className="error"/>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;