export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error-text_status_error'
};

export class FormValidation {
  constructor(formElement, config) {
    this._formElement = formElement;
    this._config = config;
  };

  _getErrorMessage(input) {
    return this._formElement.querySelector(`.${input.id}-error`);
  };
  //показ сообщения об ошибке
  _showError(input, message) {
    const errorElement = this._getErrorMessage(input);
    input.classList.add(this._config.inputErrorClass);
    errorElement.textContent = message;
    errorElement.classList.add(this._config.errorClass);
  };
  //скрыть сообщение об ощибке
  _hideError(input) {
    const errorElement = this._getErrorMessage(input);
    errorElement.classList.remove(this._config.errorClass);
    input.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
  };

  _checkValidity(input) {
    const errorElement = this._getErrorMessage(input);
    if (input.validity.patternMismatch) {
      input.setCustomValidity(input.dataset.errorMessage);
    } else {
      input.setCustomValidity("");
    }

    if (!input.validity.valid) {
      this._showError(input, input.validationMessage, errorElement);
    } else {
      this._hideError(input, errorElement);
    }
  }
  _invalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  };

  _toggleButtonState() {
    if (this._invalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled', true);
    };
  };

  _inputCheck(evt) {
    const input = evt.target;
    this._checkValidity(input);
    this._toggleButtonState();
  };

  disableSubmitButton() {
    this._buttonElement.setAttribute('disabled', true);
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
  };

  _deleteErrorMessages() {
    this._inputList.forEach(element => {
      element.classList.remove(this._config.inputErrorClass);
    })
    this._errorsList = Array.from(this._formElement.querySelectorAll(`${this._config.inputSelector}-error`));
    this._errorsList.forEach(element => {
      element.textContent = '';
      element.classList.remove(this._config.errorClass);
    })
  }

  _addEventListeners(form) {
    this._inputList = Array.from(form.querySelectorAll(this._config.inputSelector));
    this._buttonElement = form.querySelector(this._config.submitButtonSelector);

    this._formElement.addEventListener('reset', () => {
      this._deleteErrorMessages();
    });
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener('input', (evt) => {
        this._inputCheck(evt);
      });
    });
  };

  enableValidation() {
    this._addEventListeners(this._formElement);
  };
};
