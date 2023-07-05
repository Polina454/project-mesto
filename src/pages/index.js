

import "../pages/index.css";

import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { api } from "../utils/constants";
import { FormValidation, config } from "../components/FormValidation.js";
import Card from "../components/card";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  popupFormAdd, changePhotoForm, popupDescription, profileSubtitleInput, profileTitleInput,
  editButton, profileAvatarButton, addButton
} from "../utils/constants";

//валидация
const popupFormAddFormValidation = new FormValidation(popupFormAdd, config);
popupFormAddFormValidation.enableValidation();
const changePhotoFormValidation = new FormValidation(changePhotoForm, config);
changePhotoFormValidation.enableValidation();
const popupDescriptionFormValidation = new FormValidation(popupDescription, config);
popupDescriptionFormValidation.enableValidation();

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

// Создание экземпляра класса Card
function createCardInstance(dataCard) {
  const card = new Card(
    dataCard,
    userInfo.id,
    {
      handleCardClick: () => {
        const cardInfo = card.getCardInfo();
        imagePopup.open(cardInfo);
      },
      handleDeleteClick: () => handleDeleteClick(card),
      handleLikeClick: () => handleLikeClick(card),
    },
    cardTemplate
  );

  return card;
}

// Обработка клика на кнопку лайка
function handleLikeClick(card) {
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
}
// Добавление карточки на страницу
export function addCardToPage(dataCard) {
  const card = createCardInstance(dataCard);
  const cardNode = card.createCard();
  cardsList.addItem(cardNode);
}

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



