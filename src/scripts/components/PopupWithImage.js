import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__image');
        this._text = this._popup.querySelector('.popup__place-name');
    }

    openPopup({ name, link }) {
        this._image.setAttribute('src', link);
        this._image.setAttribute('alt', name);
        this._text.textContent = name;

        super.openPopup();
    }
}