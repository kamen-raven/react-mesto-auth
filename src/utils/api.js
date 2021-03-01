import config from "./utils.js";

class Api {
  constructor({ address, token, cohortId }) {
    this._address = address;
    this._token = token;
    this._cohortId = cohortId;
  }

  //возвращаем res
  _returnRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`ошибка ${res.status}`);
  }

  //--------запросы к данным пользователя
  //запрос данных пользователя
  getUserData() {
    return fetch(`${this._address}/v1/${this._cohortId}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
      .then(this._returnRes)
  }

  //запрос на обновление данных пользователя
  patchUserInfo(data) {
    return fetch(`${this._address}/v1/${this._cohortId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._returnRes)
  }

  //запрос на обновление аватара пользователя
  patchUserAvatar(data) {
    return fetch(`${this._address}/v1/${this._cohortId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._returnRes)
  }

  //---------запросы к карточкам
  //запрос массива карточек
  getInitialCards() {
    return fetch(`${this._address}/v1/${this._cohortId}/cards `, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
      .then(this._returnRes)
  }

  //запрос добавления новой карточки
  postNewCard(data) {
    return fetch(`${this._address}/v1/${this._cohortId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
      .then(this._returnRes)
  }

  //запрос на удаление карточки
  deleteCard(id) {
    return fetch(`${this._address}/v1/${this._cohortId}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    })
      .then(this._returnRes)
  }

  //-----запросы к лайкам карточек
  //запрос на постановку лайка карточки
  putLike(id) {
    return fetch(`${this._address}/v1/${this._cohortId}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      },
    })
      .then(this._returnRes)
  }

  //запрос на удаление лайка карточки
  deleteLike(id) {
    return fetch(`${this._address}/v1/${this._cohortId}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    })
      .then(this._returnRes)
  }
}


const api = new Api(config);
export default api;
