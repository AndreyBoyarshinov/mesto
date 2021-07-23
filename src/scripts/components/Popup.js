export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._keyHandler = this._keyHandler.bind(this);
    }

    _addCLoseEventListener() {
        document.querySelector('.root').addEventListener('keydown', this._keyHandler);
    }

    _removeCLoseEventListener() {
        document.querySelector('.root').removeEventListener('keydown', this._keyHandler);
    }

    _keyHandler(e) {
        if (e.key === 'Escape') {
            this.closePopup();
        }
    }

    _closePopupOverlay(e) {
        if (e.currentTarget === e.target) {
            this.closePopup();
        }
    }

    setEventListeners() {
        this._popup.querySelector('.popup__close-button').addEventListener('click', this.closePopup.bind(this));
        this._popup.addEventListener('mousedown', this._closePopupOverlay.bind(this));
    }

    openPopup() {
        this._popup.classList.add('popup_opened');
        this._addCLoseEventListener();
    }

    closePopup() {
        this._popup.classList.remove('popup_opened');
        this._removeCLoseEventListener();
    }
}