import '../pages/index.css';
import { createCard } from './card';
import { enableValidation } from './validate.js';
import { initialCards, validationConfig } from './constants.js';
import { openPopup, closePopup, closeByEscape, openPopupPic } from "./modal.js";
import { renderCard } from './card';
import { serverUserData, getCardsData, updateUser, newCard } from './api.js';
serverUserData().then((data) => {
  console.log(data);
});

getCardsData().then((data) => {
  console.log(data);
});

updateUser().then((res) => {
  console.log(res);
});

newCard().then((data) => {
  console.log(data);
});

const query = (selector) => document.querySelector(selector);
const popupAdd = query('.popup_add');
const popupEdit = query('.popup_edit');
const popupNew = query('.popup_new');
const editButton = query('.profile__edit-button');
const addButton = query('.profile__add-button');
const profileTitle = query('.profile__title');
const profileSubtitle = query('.profile__subtitle');
const popupButtonSubmit = query('.popup__button');
const popupDescription = query('.popup__form');
const inputPlace = query('.popup__input_place');
const inputLink = query('.popup__input_link');
const inputNew = query('.popup__input_new');
const popupButtonSubmitAdd = query('.popup__button_save_add');
const popupButtonSaveNew = query('.popup__button_save_new');
const popupFormAdd = query('.popup__form_add');
const changePhotoForm = query('.popup__form_new');
const profileTitleInput = query('.popup__input_title');
const profileSubtitleInput = query('.popup__input_subtitle');
const popups = document.querySelectorAll('.popup');
let profileAvatar = query('.profile__avatar');
export const cardsContainer = query('.elements');
export const popupPicOpen = query('.popup_pic');
export const popupPicText = query('.popup__text');
export const popupPicImg = query('.popup__content');
export const cardTemplate = document.querySelector('#elements-template').content;
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const profileAvatarButton = document.querySelector('.profile__icon');

//открытие
editButton.addEventListener('click', function () {
  openPopup(popupEdit);
  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
});

addButton.addEventListener('click', function () {
  openPopup(popupAdd);
});

profileAvatarButton.addEventListener('click', function () {
  openPopup(popupNew);
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

//сменить информацию о профиле
popupDescription.addEventListener('submit', (event) => {
  event.preventDefault();

  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;

  closePopup(popupEdit);
});


//смена фото
function changePhoto(event) {
  const linkObj = { link: inputNew.value };
  renderPhoto(linkObj);
  event.preventDefault();
}

changePhotoForm.addEventListener('submit', function (event) {
  event.preventDefault();
  changePhoto(event);

  inputNew.value = "";

  closePopup(popupNew);
  popupButtonSaveNew.classList.add("popup__button_inactive");
  popupButtonSaveNew.setAttribute("disabled", true);
});

function renderPhoto(link) {
  const newAvatar = document.createElement('img');
  newAvatar.classList.add('profile__avatar_new');
  newAvatar.src = link.link;
  newAvatar.alt = 'Аватар профиля';

  profileAvatar.replaceWith(newAvatar);
  profileAvatar = newAvatar;
}


//добавить карточку
function creatingСards(event) {
  const cardObj = { name: inputPlace.value, link: inputLink.value };
  renderCard(cardObj, cardsContainer);
  event.preventDefault();

  inputPlace.value = "";
  inputLink.value = "";

  closePopup(popupAdd);
  popupButtonSubmitAdd.classList.add("popup__button_inactive");
  popupButtonSubmitAdd.setAttribute("disabled", true);
}

initialCards.forEach((card) => {
  renderCard(card, cardsContainer);
});

popupFormAdd.addEventListener("submit", creatingСards);

enableValidation(validationConfig);


