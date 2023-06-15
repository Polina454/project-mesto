import '../pages/index.css';
import { createCard } from './card';
import { enableValidation } from './validate.js';
import { validationConfig } from './constants.js';
import { openPopup, closePopup, closeByEscape, openPopupPic } from "./modal.js";
import { renderCard } from './card';
import { getCards, getUser, editProfile, editAvatar, addCards, deleteCards, addLikes, removeLikes } from "./api";
import { setLoading, handleSubmit } from './utils';

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
const profileAvatar = query('.profile__avatar');
export const cardsContainer = query('.elements');
export const popupPicOpen = query('.popup_pic');
export const popupPicText = query('.popup__text');
export const popupPicImg = query('.popup__content');
export const cardTemplate = document.querySelector('#elements-template').content;
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const profileAvatarButton = document.querySelector('.profile__icon');

//открытие
editButton.addEventListener('click', function () {
  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
  openPopup(popupEdit);
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
function changeProfile(event) {

  function callFunction() {
    return editProfile({ name: profileTitleInput.value, about: profileSubtitleInput.value })
      .then((data) => {
        profileTitle.textContent = data.name;
        profileSubtitle.textContent = data.about;
        closePopup(popupEdit);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleSubmit(callFunction, event)
}
popupDescription.addEventListener("submit", changeProfile);

//смена фото
function changePhoto(event) {
  event.preventDefault();

  function callFunction() {
    return editAvatar({ avatar: inputNew.value })
      .then((editData) => {
        profileAvatar.src = editData.avatar;
        closePopup(popupNew);
        popupButtonSaveNew.classList.add("popup__button_inactive");
        popupButtonSaveNew.disabled = true;
      })
      .catch((err) => {
        console.error(err);
      });
    inputNew.value = "";
  }
  handleSubmit(callFunction, event)
}

changePhotoForm.addEventListener('submit', changePhoto);


//добавить карточку

function creatingCards(event) {
  event.preventDefault();

  function callFunction() {

    const cardInfo = {
      name: inputPlace.value,
      link: inputLink.value,
    }
    return addCards(cardInfo)

      .then((result) => {
        console.log(result);
        renderCard(result, result.owner._id, result.owner.name, result.likes, result._id);
        closePopup(popupAdd);
        popupButtonSubmitAdd.classList.add("popup__button_inactive");
        popupButtonSubmitAdd.setAttribute("disabled", true);
        popupFormAdd.reset();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  handleSubmit(callFunction, event);
}

popupFormAdd.addEventListener("submit", creatingCards);

enableValidation(validationConfig);

//Загрузка информации о пользователе с сервера и карточек
Promise.all([getUser(), getCards()])
  .then(([user, initialCards]) => {
    profileTitle.textContent = user.name;
    profileSubtitle.textContent = user.about;
    profileAvatar.src = user.avatar;

    initialCards.forEach((arrayElem) => {
      const card = createCard(arrayElem, user._id, arrayElem.owner._id, arrayElem.likes, arrayElem._id);
      cardsContainer.append(card);
    })
  })
  .catch((error) => console.log(`Ошибка: ${error}`))


//Функция для удаление карточки
export function removeCard(cardId, element) {
  deleteCards(cardId)
    .then(() => {
      element.closest(".element__cards").remove();
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
};


//Функция для лайка

export function toggleButtonLike(cardId, element) {

  const parentCard = element.closest(".element__cards");
  const cardLikeNumber = parentCard.querySelector(".element__number");


  if (element.classList.contains("element__like_active")) {
    removeLikes(cardId)
      .then((result) => {
        element.classList.remove("element__like_active")
        cardLikeNumber.textContent = result.likes.length;
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
  } else {
    addLikes(cardId)
      .then((result) => {
        element.classList.add("element__like_active");
        cardLikeNumber.textContent = result.likes.length;
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
  }

};

