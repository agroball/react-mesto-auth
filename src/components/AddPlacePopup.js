import PopupWithForm from "./PopupWithForm.js";
import React from "react";

function AddPlacePopup(props) {
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");

    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({name: name, link: link});
    }

    return(
    <PopupWithForm
        name="add"
        title="Новое Место"
        button="Создать"
        onSubmit={handleSubmit}
        isOpen={props.isOpen}
        onClose={props.onClose}
    >
        <input id="title" name="title__add" type="text" minLength="2" maxLength="30" className="form__name" placeholder="Название" onChange={handleNameChange} value={name} required/>
        <span id="title-error" className="error"/>
        <input id="link" name="link__add" type="url" className="form__name" placeholder="Ссылка на картинку" onChange={handleLinkChange} value={link} required/>
        <span id="link-error" className="error"/>
    </PopupWithForm>
)
}

export default AddPlacePopup;