export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(this._handleResponse)
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then(this._handleResponse)
    }

    setUserInfo({name, about}) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(this._handleResponse)
    }

    editAvatar({avatar}) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then(this._handleResponse)
    }

    addCard({name, link}) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(this._handleResponse)
    }

    deleteCard(id, cardElement) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then((res) => {
                if (res.ok) {
                    return cardElement;
                } else {
                    return Promise.reject();
                }
            })
    }

    toggleLike(method, id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: method,
            headers: this._headers
        })
            .then(this._handleResponse)
    }
}