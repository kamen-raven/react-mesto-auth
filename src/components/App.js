//импорт реакт-компоненты
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
//импорт вспомогательных компонентов
import api from "../utils/api.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import ProtectedRoute from "./ProtectedRoute.js";
//импорт компоненты страниц
import Main from './Main.js';
import Login from "./Login";
import Register from "./Register";
//импорт попапов
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from './ImagePopup.js';

export default function App() {
  //стейт состояния входа
  const [loggedIn, isLoggedIn] = useState(true);


  //стейт-переменная данных пользоваетля
  const [currentUser, setCurretUser] = React.useState({});

  //---------стейт открытия попапов
  //попап изменения профиля
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  //попап изменения аватара
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  //попап добавления карточки
  const [isAddPlacePopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  function handleAddPlaceClick() {
    setIsAddCardPopupOpen(true);
  }

  // стейт открытия изображения карточки
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isPopupWithImageOpen, setIsPopupWithImageOpen] = React.useState(false);

  function handleCardClick(card) {
    setIsPopupWithImageOpen(true);
    setSelectedCard(card);
  }

  //закрытие попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPopupWithImageOpen(false);
  }

  //изменение данных пользователя
  function handleUpdateUser(data) {
    api.patchUserInfo(data)
      .then((res) => {
        setCurretUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Хьюстон, у нас проблема при обновлении информации пользователя: ${error}`)
      });
  }

  //изменение аватара
  function handleUpdateAvatar(data) {
    api.patchUserAvatar(data)
      .then((res) => {
        setCurretUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Хьюстон, у нас проблема при обновлении аватара пользователя: ${error}`)
      });
  }

  //------------CARDS------------//
  //стейт карточек
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([
      api.getUserData(),
      api.getInitialCards()
    ])
      .then(([userValue, initialCards]) => {
        setCurretUser(userValue);  //отрисовка данных пользователя
        setCards(initialCards);
      })
      .catch((error) => {
        console.log(`Хьюстон, у нас проблема при загрузке первоначальной информации: ${error}`)
      })
  }, []);

  //обработчик лайков карточек
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(item =>
      item._id === currentUser._id);
    const likeRequest = !isLiked ? api.putLike(card._id) : api.deleteLike(card._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    likeRequest
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        // Обновляем стейт
        setCards(newCards);
      })
      .catch((error) => {
        console.log(`Хьюстон, у нас проблема при загрузке информации о лайках: ${error}`)
      })
  }

  //обработчик удаления карточек
  function handleCardDelete(card) {
    // Снова проверяем, являемся ли мы владельцем карточек
    const isOwn = card.owner._id === currentUser._id;
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (isOwn) {
      api.deleteCard(card._id)
        .then(() => {
          // Формируем новый массив на основе имеющегося, убирая из него удаленную карточку
          const newCards = cards.filter((c) => c._id !== card._id);
          // Обновляем стейт
          setCards(newCards);
        })
        .catch((error) => {
          console.log(`Хьюстон, у нас проблема при удалении карточки: ${error}`)
        })
    }
  }

  //обработчик добавления новых карточек
  function handleAddPlaceSubmit(data) {
    api.postNewCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Хьюстон, у нас проблема при добавлении новой карточки: ${error}`)
      })
  }

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
    <Switch>
      <ProtectedRoute exact path="/"
                      component={Main}
                      loggedIn={loggedIn}
                      cards={cards}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      onCardDelete={handleCardDelete}
                      onEditProfile={handleEditProfileClick}
                      onEditAvatar={handleEditAvatarClick}
                      onAddPlace={handleAddPlaceClick} >
      </ProtectedRoute>
      <Route path="/sing-in">
        <Login />
      </Route>
      <Route path="/sing-up">
        <Register />
      </Route>
    </Switch>

    {/* popupProfileEdit */}
    <EditProfilePopup
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      onUpdateUser={handleUpdateUser}
    />

    {/* popupAvatarEdit */}
    <EditAvatarPopup
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      onUpdateAvatar={handleUpdateAvatar}
    />

    {/* popupCardAdd */}
    <AddPlacePopup
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      onAddPlace={handleAddPlaceSubmit}
    />

    {/* popupImageView*/}
    <ImagePopup
      card={selectedCard}
      isOpen={isPopupWithImageOpen}
      onClose={closeAllPopups}
    />

    {/* popupConfirmDelete */}
    <PopupWithForm
      name="confirm-delete"
      title="Вы уверены?"
      buttonText="Да"
      onClose={closeAllPopups}
    />
</div>
  </CurrentUserContext.Provider>
  )
}
