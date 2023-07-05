
export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  };

  _onResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  //Запрос о пользователе
  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._onResponse)
  };

  //Запрос для изменение профиля
  editProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._onResponse)
  };

  //Запрос о карточках
  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(this._onResponse)
  };

  //Запрос на создания карточек
  addCards(data) {
    return fetch(`${this._baseUrl}/cards`, { // пост карточки через форму
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._onResponse)
  };

  //Запрос для изменение аватара
  editAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._onResponse)
  };

  //удаление карточки
  deleteCards(data) {
    return fetch(`${this._baseUrl}/cards/${data}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._onResponse)
  };

  //лайк
  addLikes(data) {
    return fetch(`${this._baseUrl}/cards/likes/${data._id}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._onResponse)
  };

  //удаление лайка
  removeLikes(data) {
    return fetch(`${this._baseUrl}/cards/likes/${data._id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._onResponse)
  };

  //Загрузка информации о пользователе с сервера и карточек//
  dataAll() {
    return Promise.all([this.getUser(), this.getCards()])
  };
};

