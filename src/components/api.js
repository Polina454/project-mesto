
export class Api {

  _onResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  constructor(urlConfig) {
    this._url = urlConfig.url;
    this._headers = urlConfig.headers;

  }


  //Запрос о пользователе
  getUser() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    }).then(this._onResponse)
  }

  //Запрос для изменение профиля
  editProfile(editData) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(editData),
    })
      .then(this._onResponse);
  };

  //Запрос о карточках
  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(this._onResponse)
  };

  //Запрос на создания карточек
  addCards(inputData) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(inputData),
    })
      .then(this._onResponse)
  };

  //Запрос для изменение аватара
  editAvatar(editData) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(editData),
    })
      .then(this._onResponse)
  };
  //удаление карточки
  deleteCards(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._onResponse)
  };
  //лайк
  addLikes(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(this._onResponse)
  };
  //удаление лайка
  removeLikes(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._onResponse)
  };
}


