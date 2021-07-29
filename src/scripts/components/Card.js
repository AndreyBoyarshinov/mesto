export default class Card {
    constructor(data, userId, cardTmplSelector, cardSelector, api, showImage, deleteCard) {
        this._title = data.name;
        this._image = data.link;
        this._id = data._id;
        this._userId = userId;
        this._ownerId = data.owner._id;
        this._likes = data.likes;
        this._likesAmount = data.likes.length;
        this._cardTmplSelector = cardTmplSelector;
        this._cardSelector = cardSelector;
        this._showImage = showImage;
        this._deleteCard = deleteCard;
        this._api = api;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardTmplSelector)
            .content
            .querySelector(this._cardSelector)
            .cloneNode(true);

        return cardElement;
    }

    _likeElement(e) {
        this._api.toggleLike(e.target.classList.contains('element__like-button_active') ? 'DELETE' : 'PUT', this._id)
            .then((res) => {
                this._likesAmount = res.likes.length;
                this._element.querySelector('.element__like-count').textContent = this._likesAmount;
                e.target.classList.toggle('element__like-button_active');
            })
            .catch(() => {
                console.log('Ошибка при добавлении/удалении лайка');
            });
    }

    _setEventListeners() {
        this._element
            .querySelector('.element__delete-button')
            .addEventListener('click', (e) => {
                this._deleteCard(this._id);
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

    deleteElement() {
        this._element.remove();
        this._element = null;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__image').setAttribute('style', `background-image: url( ${this._image} )`);
        this._element.querySelector('.element__title').textContent = this._title;
        if (this._likes.some((element) => element._id === this._userId))
            this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
        this._element.querySelector('.element__like-count').textContent = this._likesAmount;
        if (this._ownerId !== this._userId)
            this._element.querySelector('.element__delete-button').remove();

        return this._element;
    }
}