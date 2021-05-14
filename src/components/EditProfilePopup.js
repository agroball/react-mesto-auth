import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");


    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleAboutChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({ name: name, about: description});
    }

    // После загрузки текущего пользователя из API
// его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);


    return (
        <PopupWithForm
            name="edit"
            title="Редактировать профиль"
            button="Сохранить"
            onSubmit={handleSubmit}
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <input value={name} id="name" name="name" onChange={handleNameChange} type="text" minLength="2" maxLength="40" className="form__name" required/>
            <span id="name-error" className="error"/>
            <input value={description} id="job" name="description" onChange={handleAboutChange} type="text" minLength="2" maxLength="200" className="form__name" required/>
            <span id="job-error" className="error"/>
        </PopupWithForm>

    );

}

export default EditProfilePopup;