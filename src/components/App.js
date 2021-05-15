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
import * as Auth from '../utils/auth';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import InfoToolTip from "./InfoToolTip";
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
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = React.useState(false);
    const [isFailPopupOpen, setIsFailPopupOpen] = React.useState(false);




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

    function handleSuccessPopupClick() {
        setIsSuccessPopupOpen(true);
    }

    function handleFailPopupClick() {
        setIsFailPopupOpen(true);
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



    // Регистрация
    // function registration(email, password) {
    //     Auth.register(escapeHtml(email), password).then((res) => {
    //         if(res.status === 201){
    //             handleInfoTooltipContent({iconPath: registrationOk, text: 'Вы успешно зарегистрировались!'})
    //             handleInfoTooltipPopupOpen();
    //             // Перенаправляем на страницу логина спустя 3сек и закрываем попап
    //             setTimeout(history.push, 3000, "/sign-in");
    //             setTimeout(closeAllPopups, 2500);
    //         }
    //         if(res.status === 400) {
    //             console.log('Введный емейл ужезарегестрирован')
    //         }
    //     }).catch((err)=> {
    //         handleInfoTooltipContent({iconPath: registrationNoOK, text: 'Что-то пошло не так! Попробуйте ещё раз.'})
    //         handleInfoTooltipPopupOpen();
    //         setTimeout(closeAllPopups, 2500);
    //         console.log(err)
    //     })
    // }
    // // Авторизация
    // function authorization(email, password) {
    //     Auth.authorize(escapeHtml(email), password )
    //         .then((data) => {
    //             if (!data) {
    //                 throw new Error('Произошла ошибка');
    //             }
    //             Auth.getContent(data)
    //                 .then((res) => {
    //                     setEmail(res.data.email);
    //                 }).catch(err => console.log(err));
    //             setLoggedIn(true);
    //             handleInfoTooltipContent({iconPath: registrationOk, text: 'Вы успешно авторизовались!'})
    //             handleInfoTooltipPopupOpen();
    //             // Перенаправляем на главную страницу спустя 3сек и закрываем попап
    //             setTimeout(history.push, 3000, "/");
    //             setTimeout(closeAllPopups, 2500);
    //         }).catch((err) => {
    //         handleInfoTooltipContent({iconPath: registrationNoOK, text: 'Что то пошло не так!'})
    //         handleInfoTooltipPopupOpen();
    //         console.log(err)
    //     })
    // }










    return (
<>
    <CurrentUserContext.Provider value={currentUser}>
      <Header/>
        <Switch>
            {currentUser && <ProtectedRoute
                exact path="/"
                component={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleLikeClick}
                onCardDelete={handleDeleteClick}
            />}
            <Route path="/sign-in">
                <Login

                />
            </Route>
            <Route path="/sign-up">
                <Register

                />
            </Route>
        </Switch>
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




















































