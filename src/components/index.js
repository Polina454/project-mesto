import '../pages/index.css';

const query = (selector) => document.querySelector(selector);
const popupAdd = query('.popup_add');
const popupEdit = query('.popup_edit');
const editButton = query('.profile__edit-button');
const addButton = query('.profile__add-button');
const closeEdit = query('.popup__close-button_edit');
const closeAdd = query('.popup__close-button_add');
const profileTitle = query('.profile__title');
const profileSubtitle = query('.profile__subtitle');
const popupButtonSubmit = query('.popup__button');
const popupForm = query('.popup__form');
const textPlace = query('.element__text_place');
const itemPlace = query('.element__item');
const inputPlace = query('.popup__input_plece');
const inputLink = query('.popup__input_link');
const popupButtonSubmitAdd = query('.popup__button_save_add');
const popupFormAdd = query('.popup__form_add');
const popupInput = document.querySelector('.popup__input');
const profileTitleInput = query('.popup__input_title')
const profileSubtitleInput = query('.popup__input_subtitle')
const popupPicOpen = document.querySelector('.popup_pic');
const popupPicClose = document.querySelector('.popup__close-button_pic');
const popupPicImg = document.querySelector('.popup__content');
const popupPicText = document.querySelector('.popup__text');
const cardsContainer = document.querySelector('.elements');
const open = (popup) => popup.classList.add('popup_opened');
const close = (popup) => popup.classList.remove('popup_opened');
const popupList = document.querySelectorAll('.popup');

const openPopupEdit = () => open(popupEdit);
const openPopupAdd = () => open(popupAdd);
const closePopupEdit = () => close(popupEdit);
const closePopupAdd = () => close(popupAdd);
const closePopupPic = () => close(popupPicOpen);

addButton.addEventListener('click', openPopupAdd);
closeEdit.addEventListener('click', closePopupEdit);
closeAdd.addEventListener('click', closePopupAdd);
popupPicClose.addEventListener('click', closePopupPic);

export function openPopup(popup){
  popup.classList.add('popup_opened');
}

editButton.addEventListener('click', function() {
  openPopup(popupEdit);
  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
});


popupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;
  close(popupEdit);
});

//добавление карточек
export function createCard(linkValue, nameValue) {
  const cardTemplate = document.querySelector('#elements-template').content;
  const cardElement = cardTemplate.querySelector('.element__cards').cloneNode(true);
  cardElement.querySelector('.element__item').src = linkValue;
  cardElement.querySelector('.element__text').textContent = nameValue;
  cardElement.querySelector('.element__item').alt = nameValue;

  const deleteCard = cardElement.querySelector('.element__delete-item');
  deleteCard.addEventListener('click', function () {
    const deleteCards = deleteCard.closest('.element__cards');
    deleteCardHandler(deleteCards);
  });

  cardElement.querySelector('.element__like').addEventListener('click', function (event) {
    event.target.classList.toggle('element__like_active');
  });

  cardElement.querySelector('.element__item').addEventListener('click', function () {
    openPopupPic(nameValue, linkValue);
  });

  return cardElement;
}

export function renderPopup(linkValue, nameValue){
  cardsContainer.prepend(createCard(linkValue, nameValue));
}

export function deleteCardHandler(card) {
  card.remove();
}

export function addCard(linkValue, nameValue) {
  const cardElement = createCard(linkValue, nameValue);
  renderPopup(cardElement);
}

popupFormAdd.addEventListener('submit', (event) => {
  event.preventDefault();

  const link = inputLink.value;
  const name = inputPlace.value;

  renderPopup(link, name);

  inputLink.value = '';
  inputPlace.value = '';

  close(popupAdd);
});
//карточки
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
initialCards.forEach(card => {
  renderPopup(card.link, card.name);
});
addButton.addEventListener('click', function () {
});

// открытие картинок
export function openPopupPic(name, link) {
  openPopup(popupPicOpen);
  popupPicText.textContent = name;
  popupPicImg.src = link;
  popupPicImg.alt = name;
}

//закрытие ескейп
document.addEventListener('keydown', (evt) => {
  if (evt.key == 'Escape') {
    for (let i = 0; i < popupList.length; i++) {
      popupList[i].classList.remove('popup_opened');
    }
  }
});
//закрытие оверлей
document.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    for (let i = 0; i < popupList.length; i++) {
      popupList[i].classList.remove('popup_opened');
    }
  }
});

//валидация
export const showInputError = (popupForm, popupInput, errorMessage) => {
  const errorElement = popupForm.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error-text_status_error');
};

export const hideInputError = (popupForm, popupInput) => {
  const errorElement = popupForm.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.remove('popup__input_status_error');
  errorElement.classList.remove('popup__error-text_status_error');
  errorElement.textContent = '';
};

export const isValid = (popupForm, popupInput) => {
  if (popupInput.validity.patternMismatch) {
    popupInput.setCustomValidity(popupInput.dataset.errorMessage);
} else {
  popupInput.setCustomValidity("");
}

if (!popupInput.validity.valid) {
  showInputError(popupForm, popupInput, popupInput.validationMessage);
} else {
  hideInputError(popupForm, popupInput);
}
};

export const setEventListeners = (popupForm) => {
  const inputList = Array.from(popupForm.querySelectorAll('.popup__input'));
  const popupButtonSubmit = popupForm.querySelector(".popup__button");
  inputList.forEach((popupInput) => {
    popupInput.addEventListener('input', () => {
          isValid(popupForm, popupInput);
          toggleButtonState(inputList, popupButtonSubmit);
      });
  });
};

export const toggleButtonState = (inputList, popupButtonSubmit) => {
  if (hasInvalidInput(inputList)) {
    popupButtonSubmit.classList.add('popup__button_inactive');
      popupButtonSubmit.disabled = true;
  } else {
    popupButtonSubmit.classList.remove('popup__button_inactive');
      popupButtonSubmit.disabled = false;
  }
};

export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((popupForm) => {
    popupForm.addEventListener('submit', (evt) => {
          evt.preventDefault();
      });
      setEventListeners(popupForm);
  });
};

export const hasInvalidInput = (inputList) => {
  return inputList.some((popupInput) => {
      return !popupInput.validity.valid;
  })
};

enableValidation();






