export default class UserInfo {
    constructor({nameSelector, aboutSelector, upicSelector, editHandler}) {
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(aboutSelector);
        this._upic = document.querySelector(upicSelector);
        this._editHandler = editHandler;
    }

    getUserInfo() {
        return {name: this._name.textContent, about: this._about.textContent};
    }

    setUserInfo({name, about, avatar, _id}) {
        this._name.textContent = name;
        this._about.textContent = about;
        this._upic.src = avatar;
        this._id = _id;
    }

    getUserId() {
        return this._id;
    }
}