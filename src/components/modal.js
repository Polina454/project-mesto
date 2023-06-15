import { popupPicOpen, popupPicImg, popupPicText } from "./index.js";

export function openPopup(popup) {
  if (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
  }
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

export function closeByEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    openedPopup && closePopup(openedPopup);
  }

}
// открытие картинок
export function openPopupPic(cardInfo) {
  const { name, link } = cardInfo;
  popupPicText.textContent = name;
  popupPicImg.src = link;
  popupPicImg.alt = name;
  openPopup(popupPicOpen);
}
