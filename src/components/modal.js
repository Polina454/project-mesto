import { popupPicOpen, popupPicImg, popupPicText } from "./index.js";

export function openPopup(popup) {
  if (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
  }
}
export function closePopup(popup) {
  if (popup) {
    popup.classList.remove('popup_opened');
  }
}
export function closeByEscape(event) {
  const openedPopup = document.querySelector('.popup_opened');
  if (openedPopup && event.key === 'Escape') {
    closePopup(openedPopup);
  }
}
// открытие картинок
export function openPopupPic(name, link) {
  openPopup(popupPicOpen);
  popupPicText.textContent = name;
  popupPicImg.src = link;
  popupPicImg.alt = name;
}
