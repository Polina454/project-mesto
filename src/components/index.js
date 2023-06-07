import '../pages/index.css';
import { createCard } from './card';
import { enableValidation } from './validate.js';
import { initialCards } from './constants.js';
import { openPopup, closePopup, closeByEscape, openPopupPic } from "./modal.js";
import { renderPopup } from './utils';

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
const profileTitleInput = query('.popup__input_title');
const profileSubtitleInput = query('.popup__input_subtitle');
const popupPicClose = query('.popup__close-button_pic');
const popups = document.querySelectorAll('.popup');
export const cardsContainer = query('.elements');
export const popupPicOpen = query('.popup_pic');
export const popupPicText = query('.popup__text');
export const popupPicImg = query('.popup__content');
export const cardTemplate = document.querySelector('#elements-template').content;
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

//открытие
editButton.addEventListener('click', function() {
  openPopup(popupEdit);
  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
});

addButton.addEventListener('click', function() {
  openPopup(popupAdd);
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


popupForm.addEventListener('submit', (event) => {
  event.preventDefault();

  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;

  closePopup(popupEdit);
});

popupFormAdd.addEventListener('submit', (event) => {
 event.preventDefault();

linkValue.value = '';
inputPlace.value = '';

  closePopup(popupAdd);
});

initialCards.forEach(card => {
  renderPopup(card, cardsContainer);
 });

