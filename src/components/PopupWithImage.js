import { Popup } from '../components/Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__content');
    this._popupText = this._popup.querySelector('.popup__text');
  }

  open(data) {
    this._popupImage.src = data.link;
    this._popupImage.alt = `${data.name}`;
    this._popupText.textContent = data.name;
    super.open();
  }
};
