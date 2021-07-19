export default class Card {
    constructor(data, cardTmplSelector, cardSelector, showImage) {
        this._title = data.name;
        this._image = data.link;
        this._cardTmplSelector = cardTmplSelector;
        this._cardSelector = cardSelector;
        this._showImage = showImage;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardTmplSelector)
            .content
            .querySelector(this._cardSelector)
            .cloneNode(true);

        return cardElement;
    }

    _deleteElement(e) {
        this._element.remove();
        this._element = null;
    }

    _likeElement(e) {
        e.target.classList.toggle('element__like-button_active');
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
                this._showImage({link: this._image, name: this._title});
            });

        this._element
            .querySelector('.element__like-button')
            .addEventListener('click', (e) => {
                this._likeElement(e);
            });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__image').setAttribute('style', `background-image: url( ${this._image} )`);
        this._element.querySelector('.element__title').textContent = this._title;

        return this._element;
    }
}