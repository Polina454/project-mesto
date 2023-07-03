export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._closePopup = this._closePopup.bind(this);
    this._closeByEscape = this._closeByEscape.bind(this);
  }

  open() {
    this.setEventListeners();
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._removeEventListeners();
    this._popup.classList.remove('popup_opened');
  }

  _closePopup(evt) {
    if (evt.target.classList.contains('popup__close-button') || evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  _closeByEscape(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', this._closePopup);
    document.addEventListener('keydown', this._closeByEscape);
  }

  _removeEventListeners() {
    this._popup.removeEventListener('mousedown', this._closePopup);
    document.removeEventListener('keydown', this._closeByEscape);
  }

};


