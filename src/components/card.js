import { openPopupPic } from "./modal";
import { renderPopup } from "./utils";
import { cardTemplate } from "./index.js";
//добавление карточек
export function createCard(cardInfo) {
  const {name, link} = cardInfo;
  const cardElement = cardTemplate.querySelector('.element__cards').cloneNode(true);
  const linkValue = cardElement.querySelector('.element__item');
  const nameValue = cardElement.querySelector('.element__text');
   nameValue.textContent = name;
   linkValue.alt = name;
   linkValue.src = link;

//удаление карточек
  const deleteCard = cardElement.querySelector('.element__delete-item');
  deleteCard.addEventListener('click', function () {
    const cardElement = deleteCard.closest('.element__cards');
    deleteCardHandler(cardElement);
  });
//лайки
  cardElement.querySelector('.element__like')

.addEventListener('click', function (event) {
    event.target.classList.toggle('element__like_active');
  });

  cardElement.querySelector('.element__item').addEventListener('click', function () {
    openPopupPic(cardInfo);
  });

  return cardElement;
}
function deleteCardHandler(card) {
  card.remove();
}



