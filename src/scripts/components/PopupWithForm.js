import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({handleSubmit, handleReset, popupSelector}) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._handleReset = handleReset;
        this._form = this._popup.querySelector('.popup__form');
        this._btn = this._popup.querySelector('.popup__button');
        this._inputList = this._form.querySelectorAll('.popup__field');
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);

        return this._formValues;
    }

    renderSaving(isSaving) {
        if (isSaving) {
            this._btn.textContent = 'Сохранение...';
        } else {
            this._btn.textContent = 'Сохранить';
        }
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.renderSaving(true);
            this._handleSubmit(this._getInputValues());
        })
    }

    closePopup() {
        super.closePopup();
        this._form.reset();
        this._handleReset();
    }
}