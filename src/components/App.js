import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Login from './Login.js';
import Register from './Register';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api.js';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";


function App() {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [isPopupWithImageOpen, setIsPopupWithImageOpen] = React.useState(false);
    const [cards, setCards] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState({ name: '', about: ''});




    React.useEffect(() => {
        const promises = [api.getUserInfo(), api.getInitialCards()];
        Promise.all(promises)
            .then(([user, cards]) => {
                setCurrentUser(user);
                setCards(cards);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick(){
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
        setIsPopupWithImageOpen(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard('' );
        setIsPopupWithImageOpen(false);
    }

    function handleLikeClick(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
                const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
                // Обновляем стейт
                setCards(newCards);
            })
            .catch((err) => console.log(err));
    }

    function handleDeleteClick(card){
        api.deleteCard(card._id)
            .then((newCard)=> {
                const newCards = cards.filter((c) =>
                    c._id === card._id ? "" : newCard
                );
                setCards(newCards);
            })
            .catch((err) => console.log(err));
    }

    function handleUpdateUser({name, about}) {
        return api.setUserInfo(name, about)
            .then((result) => {
                setCurrentUser(result);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleUpdateAvatar(data) {
        api.updateAvatarImage(data)
            .then((result) => {
                setCurrentUser(result);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleAddPlaceSubmit({name, link}) {
        api.addCard(name, link)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }



    return (
<>
    <CurrentUserContext.Provider value={currentUser}>
      <Header/>
        <Switch>
            <Main
                exact path="/"
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleLikeClick}
                onCardDelete={handleDeleteClick}
            />
            <Route exact path="/sign-up">
               <Login/>
            </Route>
            <Route exact path="/sign-in">
                <Register/>
            </Route>
        </Switch>
        {/*{loggenIn && <Footer/>}*/}
        <Footer/>
        <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
        />



          <PopupWithForm name="agreePopup"
                         title="Вы уверены?"
                         button="Да">
          </PopupWithForm>


          <ImagePopup
              card={selectedCard}
              isOpen={isPopupWithImageOpen}
              onClose={closeAllPopups}
          >
          </ImagePopup>
    </CurrentUserContext.Provider>
</>
  );
}

export default App;




















































