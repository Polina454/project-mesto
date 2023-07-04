import { Popup } from '../components/Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, { submit }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._inputsList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._submit = submit;
    this._popupButton = this._form.querySelector('.popup__button');
    this._originalText = this._popupButton.textContent;
    this._submitHandler = this._submitHandler.bind(this);
  }

  toggleButtonText(isLoading, buttonLoadingText = 'Cохранение...') {
    if (isLoading) {
      this._popupButton.textContent = buttonLoadingText;
    } else {
      this._popupButton.textContent = this._originalText;
    }
  }

  _getInputValues() {
    const data = {};
    this._inputsList.forEach(input => {
      data[input.name] = input.value;
    })
    return data;
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._submit(this._getInputValues());
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._submitHandler);
    super.setEventListeners();
  }

  _removeEventListeners() {
    this._form.removeEventListener('submit', this._submitHandler);
    super._removeEventListeners();
  }

  close() {
    this._form.reset();
    this._removeEventListeners();
    super.close();
  }
}
