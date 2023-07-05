import "../pages/index.css";

import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Api } from '../components/Api.js';
import { FormValidation, config } from "../components/FormValidation.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

//переменные
const popupFormAdd = document.querySelector('.popup__form_add');
const changePhotoForm = document.querySelector('.popup__form_new');
const popupDescription = document.querySelector('.popup__form');
const profileSubtitleInput = document.querySelector('.popup__input_subtitle');
const profileTitleInput = document.querySelector('.popup__input_title');
const editButton = document.querySelector('.profile__edit-button');
const profileAvatarButton = document.querySelector('.profile__icon');
const addButton = document.querySelector('.profile__add-button')
//валидация
const popupFormAddFormValidation = new FormValidation(popupFormAdd, config);
popupFormAddFormValidation.enableValidation();
const changePhotoFormValidation = new FormValidation(changePhotoForm, config);
changePhotoFormValidation.enableValidation();
const popupDescriptionFormValidation = new FormValidation(popupDescription, config);
popupDescriptionFormValidation.enableValidation();
export const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-25",
  headers: {
    authorization: "b12664a1-013d-4344-813d-a0e4066b7aa4",
    "Content-Type": "application/json",
  },
});


const cardsContainer = '.elements';
api
  .dataAll()
  .then((values) => {
    const [userData, cards] = values;
    userInfo.editProfile(userData);
    cardsList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

const cardsList = new Section(
  {
    renderer: (card) => {
      addCardToPage(card);
    },
  },
  cardsContainer
);

function handleDeleteClick(card) {
  api
    .deleteCards(card._id)
    .then(() => {
      card.deleteCardToPage();
    })
    .catch((err) => {
      console.log(err);
    });
};

const cardTemplate = '#elements-template';
function addCardToPage(dataCard) {
  const card = new Card(
    dataCard,
    userInfo.id,
    {
      handleCardClick: () => {
        const cardInfo = card.getCardInfo();
        imagePopup.open(cardInfo);
      },
      handleDeleteClick: () => handleDeleteClick(card),
      handleLikeClick: () => {
        if (card.haveLikeOwner()) {
          api
            .removeLikes(card)
            .then((data) => {
              card.setCountLikeToPage(data.likes);
              card.setStateLike();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          api
            .addLikes(card)
            .then((data) => {
              card.setCountLikeToPage(data.likes);
              card.setStateLike();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
    },
    cardTemplate
  );
  const cardNode = card.createCard();
  cardsList.addItem(cardNode);
};

const profileTitle = '.profile__title';
const profileSubtitle = '.profile__subtitle';
const profileAvatar = '.profile__avatar';
const userInfo = new UserInfo(
  profileTitle,
  profileSubtitle,
  profileAvatar
);

const popupPicOpen = '.popup_pic';
const imagePopup = new PopupWithImage(popupPicOpen);

const popupAdd = '.popup_add';
const popupWithFormAdd = new PopupWithForm(popupAdd, {
  submit: (data) => {
    popupWithFormAdd.toggleButtonText(true);
    api.addCards(data)
      .then((res) => {
        addCardToPage(res);
        popupWithFormAdd.close()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithFormAdd.toggleButtonText(false);
      })
  }
});
//
const popupEdit = '.popup_edit';
const popupWithFormEdit = new PopupWithForm(popupEdit, {
  submit: (data) => {
    popupWithFormEdit.toggleButtonText(true);
    api.editProfile(data)
      .then((res) => {
        userInfo.editProfile(res);
        popupWithFormEdit.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithFormEdit.toggleButtonText(false);
      })
  }
});

const popupNew = '.popup_new';
const popupWithFormNew = new PopupWithForm(popupNew, {
  submit: (data) => {
    popupWithFormNew.toggleButtonText(true);
    api.editAvatar(data)
      .then((res) => {
        userInfo.editAvatar(res);
        popupWithFormNew.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithFormNew.toggleButtonText(false);
      })
  }
});

//слушатели
editButton.addEventListener('click', () => {
  const userData = userInfo.getUser();
  profileTitleInput.value = userData.name;
  profileSubtitleInput.value = userData.about;
  popupWithFormEdit.open();
});
addButton.addEventListener('click', () => {
  popupFormAddFormValidation.disableSubmitButton();
  popupWithFormAdd.open()
});
profileAvatarButton.addEventListener('click', () => {
  changePhotoFormValidation.disableSubmitButton();
  popupWithFormNew.open();
});
