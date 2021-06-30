import { popupShowCard, popupImage, popupImageName, openPopup} from './index.js';

class Card {
    constructor(data, cardSelector) {
        this._title = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .cloneNode(true);

        return cardElement;
    }

    _deleteElement(e) {
        e.target.closest('.element').remove();
    }

    _showImage() {
        openPopup(popupShowCard);
        popupImage.setAttribute('src', this._image);
        popupImage.setAttribute('alt', this._title);
        popupImageName.textContent = this._title;
    }

    _setEventListeners() {
        this._element
            .querySelector('.element__delete-button')
            .addEventListener('click', (e) => {
                this._deleteElement(e);
            });

        this._element
            .querySelector('.element__image')
            .addEventListener('click', () => {
                this._showImage();
            });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__image').setAttribute('style', 'background-image: url(' + this._image + ')');
        this._element.querySelector('.element__title').textContent = this._title;

        return this._element;
    }
}

export default Card;