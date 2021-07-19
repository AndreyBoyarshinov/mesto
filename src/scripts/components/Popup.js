export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    _addCLoseEventListener() {
        document.querySelector('.page').addEventListener('keydown', this._keyHandler.bind(this));
    }

    _removeCLoseEventListener() {
        document.querySelector('.page').removeEventListener('keydown', this._keyHandler.bind(this));
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

    setEventListeners(closeBtnSelector) {
        this._popup.querySelector(closeBtnSelector).addEventListener('click', this.closePopup.bind(this));
        this._popup.addEventListener('click', this._closePopupOverlay.bind(this));
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