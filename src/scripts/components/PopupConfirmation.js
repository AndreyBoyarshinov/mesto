import Popup from './Popup.js';

export default class PopupConfirmation extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._handleSubmit = handleSubmit;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleSubmit(this._idCard, this._cardElement);
        })
    }

    openPopup(idCard, cardElement) {
        this._idCard = idCard;
        this._cardElement = cardElement;
        super.openPopup();
    }
}