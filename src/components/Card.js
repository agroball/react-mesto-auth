import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const [liked, setLiked] = React.useState(
        props.card.likes.some((i) => i._id === currentUser._id)
    );
    const isOwn = props.card.owner._id === currentUser._id;

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        setLiked(!liked);
        props.onCardLike(props.card);
    }

    const cardDeleteButtonClassName = (`element__trash ${isOwn ? '' : 'element__trash_hidden'}`);
    const cardLikeButtonClassName = (`element__like ${liked && 'element__like_active'}`);

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
     <div className="element">
         <img className="element__link" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
         <div className="element__header">
             <h2 className="element__text">{props.card.name}</h2>
             <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"/>
             <span className="element__number">{props.card.likes.length}</span>
             <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button"/>
         </div>
     </div>
 ) 
}

export default Card;