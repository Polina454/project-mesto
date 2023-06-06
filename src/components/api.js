/*
//1. Загрузка информации о пользователе с сервера
fetch('https://mesto.nomoreparties.co/v1/plus-cohort-25/users/me', {
  method: 'GET',
  headers: {
    authorization: 'b12664a1-013d-4344-813d-a0e4066b7aa4',
    'Content-Type': 'application/json'
  }
})
  .then(res => res.json())
  .then((result) => {
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

//2. загрузка карточек с сервера
fetch('https://mesto.nomoreparties.co/v1/plus-cohort-25/cards', {
  headers: {
    authorization: 'b12664a1-013d-4344-813d-a0e4066b7aa4'
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    return response.json();
  })
  .then(cards => {
    cards.forEach(card => {
      renderPopup(card.link, card.name);
    });
  })
  .catch(error => {
    console.error('Error fetching cards:', error);
  });

//3. редактирование профиля
fetch('https://mesto.nomoreparties.co/v1/plus-cohort-25/users/me', {
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

//4. добавление карточки
  fetch('https://mesto.nomoreparties.co/v1/plus-cohort-25/cards', {
  method: 'POST',
  headers: {
    authorization: 'b12664a1-013d-4344-813d-a0e4066b7aa4',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Орел',
    link: 'https://images.unsplash.com/photo-1685123466319-d7d8bae569d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80'
  })
})
  .then(res => {
    if (res.ok) {
    } else {
      throw new Error(`Ошибка: ${res.status} ${res.statusText}`)
    }
  })
  .catch(err => {
    console.error(err)
  })*/







