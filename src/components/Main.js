import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);




    return ( <div className="main" >
        <section className="profile" >
        <div className="profile__header" >
        <div className="profile__avatar-container" >
        <img className="profile__avatar"
             src={currentUser.avatar}
             alt="Фото профиля"
        />
        <button className="profile__avatar-button" onClick={props.onEditAvatar}/>
        </div>
            <div className="profile__info" >
        <div className="profile__line" >
        <h1 className="profile__title" > {currentUser.name} </h1>
            <button className="profile__editbutton"
        type="button"
        onClick={props.onEditProfile}
        />
        </div>
                <p className="profile__paragraph" > {currentUser.about} </p>
            </div>
        </div>
            <button className="profile__addbutton"
        type="button"
        onClick={props.onAddPlace}
        />
        </section>

            <section className="elements" >
                {props.cards.map((card) => (
                <Card
                    key={card._id}
                    link={card.link}
                    name={card.name}
                    likes={card.likes}
                    onCardClick={props.onCardClick}
                    card={card}
                    onCardLike={props.onCardLike}
                    onCardDelete={props.onCardDelete}
                />
            ))}

    </section>
    </div>
    );
}

export default Main;