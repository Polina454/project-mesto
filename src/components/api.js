
//1. Загрузка информации о пользователе с сервера
export const serverUserData = () => {
  return fetch('https://mesto.nomoreparties.co/v1/plus-cohort-25/users/me', {
    headers: {
      authorization: 'b12664a1-013d-4344-813d-a0e4066b7aa4',
      'Content-Type': 'application/json'
    }
  })
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });
}

//2. загрузка карточек с сервера
export const getCardsData = () => {
  return fetch('https://mesto.nomoreparties.co/v1/plus-cohort-25/cards', {
    headers: {
      authorization: 'b12664a1-013d-4344-813d-a0e4066b7aa4'
    }
  })
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });
}
//3. редактирование профиля
export const updateUser = () => {
  return fetch('https://mesto.nomoreparties.co/v1/plus-cohort-25/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'b12664a1-013d-4344-813d-a0e4066b7aa4',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Polina Bliznyuk',
      about: 'Web developer'
    })
  });
}

//4. добавление карточки
export const newCard = () => {
  return fetch('https://mesto.nomoreparties.co/v1/plus-cohort-25/cards', {
    method: 'POST',
    headers: {
      authorization: 'b12664a1-013d-4344-813d-a0e4066b7aa4',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Ошибка: ${res.status} ${res.statusText}`)
    }
  })
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err)
  });
}



