// import { data } from "autoprefixer";

const urlConfig = {
  url: "https://nomoreparties.co/v1/plus-cohort-25",
  headers: {
    authorization: "b12664a1-013d-4344-813d-a0e4066b7aa4",
    "Content-Type": "application/json",
  }
}

function onResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

//Запрос о пользователе
export function getUser() {
  return fetch(`${urlConfig.url}/users/me`, {
    headers: urlConfig.headers
  }).then(onResponse)
}

//Запрос для изменение профиля
export function editProfile(editData) {
  return fetch(`${urlConfig.url}/users/me`, {
    method: "PATCH",
    headers: urlConfig.headers,
    body: JSON.stringify(editData),
  })
    .then(onResponse);
};

//Запрос о карточках
export function getCards() {
  return fetch(`${urlConfig.url}/cards`, {
    headers: urlConfig.headers
  })
    .then(onResponse)
};

//Запрос на создания карточек
export function addCards(inputData) {
  return fetch(`${urlConfig.url}/cards`, {
    method: "POST",
    headers: urlConfig.headers,
    body: JSON.stringify(inputData),
  })
    .then(onResponse)
};

//Запрос для изменение аватара
export function editAvatar(editData) {
  return fetch(`${urlConfig.url}/users/me/avatar`, {
    method: "PATCH",
    headers: urlConfig.headers,
    body: JSON.stringify(editData),
  })
    .then(onResponse)
};
//удаление карточки
export function deleteCards(cardId) {
  return fetch(`${urlConfig.url}/cards/${cardId}`, {
    method: "DELETE",
    headers: urlConfig.headers,
  })
    .then(onResponse)
};
//лайк
export function addLikes(cardId) {
  return fetch(`${urlConfig.url}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: urlConfig.headers,
  })
    .then(onResponse)
};
//удаление лайка
export function removeLikes(cardId) {
  return fetch(`${urlConfig.url}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: urlConfig.headers,
  })
    .then(onResponse)
};
