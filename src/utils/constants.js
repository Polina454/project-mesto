import { Api } from "../components/Api";
//переменные
export const popupFormAdd = document.querySelector('.popup__form_add');
export const changePhotoForm = document.querySelector('.popup__form_new');
export const popupDescription = document.querySelector('.popup__form');
export const profileSubtitleInput = document.querySelector('.popup__input_subtitle');
export const profileTitleInput = document.querySelector('.popup__input_title');
export const editButton = document.querySelector('.profile__edit-button');
export const profileAvatarButton = document.querySelector('.profile__icon');
export const addButton = document.querySelector('.profile__add-button')

export const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-25",
  headers: {
    authorization: "b12664a1-013d-4344-813d-a0e4066b7aa4",
    "Content-Type": "application/json",
  },
});
