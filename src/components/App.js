//импорт реакт-компоненты
import React, { useState, useEffect, useCallback} from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
//импорт вспомогательных компонентов
import api from "../utils/api.js";
import * as auth from "../utils/auth.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import ProtectedRoute from "./ProtectedRoute.js";
//импорт компоненты страниц
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import Login from "./Login.js";
import Register from "./Register.js";

//импорт попапов
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import InfoTooltip from "./InfoTooltip.js";

export default function App() {
  //-----------------РЕГИСТРАЦИЯ И АВТОРИЗАЦИЯ НА САЙТЕ
  //стейт состояния авторизации на сайте
  const [loggedIn, setLoggedIn] = useState(false);
  //стейт емэйла пользователя при авторизации
  const [email, setEmail] = useState('');
  //стейт состояния попапа результата регистрации
  const [isInfoTooltipIsOpen, setIsInfoTooltipIsOpen] = useState(false);
  const [isRegistrationSucces, setIsRegistrationSucces] = useState(false);
  const history = useHistory();

  //обработчик регистрации
  function handleRegister({ email, password }) {
    return auth.register(email, password)
    .then((res) => {
      setIsRegistrationSucces(true); //успешное
      setIsInfoTooltipIsOpen(true);
      history.push('/sing-in'); //перенаправление на страницу входа
      return res;
    })
    .catch((error) => {
      setIsInfoTooltipIsOpen(true);
      console.log(`Хьюстон, у нас проблема при регистрации пользователя: ${error} - некорректно заполнено одно из полей `);
    })
  }

  //обработчик авторизации
  function handleLogin({ email, password }) {
    return auth.login(email, password)
    .then((res) => {
      setLoggedIn(true);
      localStorage.setItem('jwt', res.token); //сохраняем токен в локальное хранилище
      history.push('/'); //перенаправление на страницу с карточками
      return res;
    })
    .catch((error) => {
      if (error === 'ошибка 400') {
        console.log(`Хьюстон, у нас проблема при авторизации пользователя: ${error} - не передано одно из полей`)
      } else {
        console.log(`Хьюстон, у нас проблема при авторизации пользователя: ${error} - пользователь с email не найден`)
      }
    })
  }

  //проверяем токен пользователя при повторном входе на сайт
  const checkToken = useCallback(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email); //получаем данные емэйла
            history.push('/');
          }
        })
        .catch((error) => {
          history.push('/sing-in'); //если токена нет - перенаправляем на Вход
          console.log(`Хьюстон, у нас проблема при проверке токена пользователя: ${error} - токен не передан или переданный токен некорректен `);
        })
    }
  }, []);


    useEffect(() => {
      checkToken();
    }, [])












  //----------------РАБОТА С ГЛАВНОЙ СТРАНИЦЕЙ
  //стейт-переменная данных пользоваетля
  const [currentUser, setCurretUser] = useState({});

  //---------стейт открытия попапов
  //попап изменения профиля
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  //попап изменения аватара
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  //попап добавления карточки
  const [isAddPlacePopupOpen, setIsAddCardPopupOpen] = useState(false);
  function handleAddPlaceClick() {
    setIsAddCardPopupOpen(true);
  }

  // стейт открытия изображения карточки
  const [selectedCard, setSelectedCard] = useState({});
  const [isPopupWithImageOpen, setIsPopupWithImageOpen] = useState(false);

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
    setIsInfoTooltipIsOpen(false);
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
  const [cards, setCards] = useState([]);

  useEffect(() => {
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
      <Header />
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
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/sing-up">
            <Register onRegister={handleRegister} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sing-in" />}
          </Route>
        </Switch>
      <Footer />

    {/* InfoTooltip*/}
    <InfoTooltip
      isOpen={isInfoTooltipIsOpen}
      onClose={closeAllPopups}
      isSucces={isRegistrationSucces}/>

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
