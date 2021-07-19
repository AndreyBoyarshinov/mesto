import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ handleSubmit, handleReset, popupSelector, formSelector }) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._handleReset = handleReset;
        this._form = document.querySelector(formSelector);
    }

    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.popup__field');

        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);

        return this._formValues;
    }

    fillForm({ name, status }) {
        this._form.elements.name.value = name;
        this._form.elements.status.value = status;
    }

    setEventListeners(closeBtnSelector) {
        super.setEventListeners(closeBtnSelector);

        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleSubmit(this._getInputValues());

            this._form.reset();
        })
    }

    closePopup() {
        super.closePopup();
        this._form.reset();
        this._handleReset();
    }
}