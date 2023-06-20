import { openPopupPic } from "./modal";
import { removeCard, cardTemplate } from "./index.js";
import { cardsContainer, toggleButtonLike } from "./index.js";

//добавление карточек
export function createCard(cardInfo, userId,  user, likes, cardId) {
  const { name, link } = cardInfo;
  const cardElement = cardTemplate.querySelector('.element__cards').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__item');
  const nameValue = cardElement.querySelector('.element__text');
  nameValue.textContent = name;
  cardImage.alt = name;
  cardImage.src = link;

  //удаление карточек
  const cardDeleteButton = cardElement.querySelector('.element__delete-item');

  function handleDeleteButtonClick(cardInfo, cardElement) {
    removeCard(cardInfo._id, cardElement);
  }
  if (userId !== cardInfo.owner._id) {
    cardDeleteButton.remove();
  } else {
    cardDeleteButton.addEventListener("click", () => removeCard(cardId, cardDeleteButton));
  }

  //лайки
  const likeNumber = cardElement.querySelector(".element__number");
  likeNumber.textContent = Array.isArray(likes) && likes.length > 0 ? likes.length : "0";
  const likeCards = cardElement.querySelector(".element__like");
  if (Array.isArray(likes) && likes.find((item) => item._id === user)) {
    likeCards.classList.add("element__like_active");
  }
  cardImage.addEventListener('click', function () {
    openPopupPic(cardInfo);
  });
  cardDeleteButton.addEventListener('click', () => {
    handleDeleteButtonClick(cardInfo, cardElement);
  });

  likeCards.addEventListener("click", () => toggleButtonLike(cardId, likeCards));
  cardImage.addEventListener("click", () => openPopupPic(cardInfo));

  return cardElement;
};

//отображение карточки на страницеe
export function renderCard(cardInfo, userId, user, likes, cardId) {
  cardsContainer.prepend(createCard(cardInfo, userId, user, likes, cardId));
}





