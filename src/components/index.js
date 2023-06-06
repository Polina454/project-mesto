import '../pages/index.css';
import { enableValidation } from './validate.js';
import { openPopup, closePopup, closeByEscape } from "./modal.js";
//import { createCard, renderPopup, deleteCardHandler } from './card.js';

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
const inputPlace = query('.popup__input_place');
const inputLink = query('.popup__input_link');
const popupButtonSubmitAdd = query('.popup__button_save_add');
const popupFormAdd = query('.popup__form_add');
const popupInput = query('.popup__input_place');
const profileTitleInput = query('.popup__input_title');
const profileSubtitleInput = query('.popup__input_subtitle');
const popupPicOpen = query('.popup_pic');
const popupPicClose = query('.popup__close-button_pic');
const popupPicImg = query('.popup__content');
const popupPicText = query('.popup__text');
const cardsContainer = query('.elements');
const popups = document.querySelectorAll('.popup');

const popupCloseButtons = document.querySelectorAll('.popup__close-button');

//открытие
editButton.addEventListener('click', function() {
  openPopup(popupEdit);
  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
});
addButton.addEventListener('click', function() {
  openPopup(popupAdd);
  inputPlace.value = '';
  inputLink.value = '';
});

//закрытие
popupCloseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closePopup(popup);
  });
});
popups.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
});
//добавление карточек
function createCard(linkValue, nameValue) {
  const cardTemplate = document.querySelector('#elements-template').content;
  const cardElement = cardTemplate.querySelector('.element__cards').cloneNode(true);
  cardElement.querySelector('.element__item').src = linkValue;
  cardElement.querySelector('.element__text').textContent = nameValue;
  cardElement.querySelector('.element__item').alt = nameValue;

  const deleteCard = cardElement.querySelector('.element__delete-item');
  deleteCard.addEventListener('click', function () {
    const cardElement = deleteCard.closest('.element__cards');
    deleteCardHandler(cardElement);
  });

  cardElement.querySelector('.element__like')

.addEventListener('click', function (event) {
    event.target.classList.toggle('element__like_active');
  });

  cardElement.querySelector('.element__item').addEventListener('click', function () {
    openPopupPic(nameValue, linkValue);
  });

  return cardElement;
}

function renderPopup(linkValue, nameValue){
  cardsContainer.prepend(createCard(linkValue, nameValue));
}

function deleteCardHandler(card) {
  card.remove();
}

popupForm.addEventListener('submit', (event) => {
  event.preventDefault();

  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;

  closePopup(popupEdit);
});

popupFormAdd.addEventListener('submit', (event) => {
  event.preventDefault();

  linkValue = inputLink.value;
  nameValue = inputPlace.value;

  renderPopup(linkValue, nameValue);

  inputLink.value = '';
  inputPlace.value = '';

  closePopup(popupAdd);
});

//карточки
const initialCards = [
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
function openPopupPic(name, link) {
  openPopup(popupPicOpen);
  popupPicText.textContent = name;
  popupPicImg.src = link;
  popupPicImg.alt = name;
}





