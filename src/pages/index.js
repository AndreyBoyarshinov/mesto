import Api from '../scripts/components/Api.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupConfirmation from '../scripts/components/PopupConfirmation.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import UserInfo from '../scripts/components/UserInfo.js';
import {selectorNames} from '../scripts/initial-cards.js';
import '../pages/index.css';

const editProfileBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');
const editAvatarBtn = document.querySelector('.profile__avatar-container');
const popupEditProfileForm = document.querySelector('.popup__form_type_profile');
const popupAddCardForm = document.querySelector('.popup__form_type_add-card');
const popupEditAvatarForm = document.querySelector('.popup__form_type_edit-avatar');
const formName = popupEditProfileForm.querySelector('.popup__field_text_name');
const formAbout = popupEditProfileForm.querySelector('.popup__field_text_status');
let formProfileValidator, formAddCardValidator, formEditAvatarValidator;

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-26',
    headers: {
        authorization: '94d60224-d972-4e1e-b894-67c26de135d0',
        'Content-Type': 'application/json'
    }
});

const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    aboutSelector: '.profile__status',
    upicSelector: '.profile__avatar'
});

const cardsList = new Section({
    renderer: (item) => {
        cardsList.addItem(generateCard(item, userInfo.getUserId()));
    },
    containerSelector: '.elements__list'
});

api.getUserInfo()
    .then(res => {
        userInfo.setUserInfo(res);
    })
    .then(() => {
        api.getCards()
            .then(res => {
                cardsList.renderItems(res);
            })
            .catch(() => {
                console.log('error download card');
            });
    })
    .catch(() => {
        console.log('error download profile info');
    });

const popupConfirmation = new PopupConfirmation('.popup_type_confirmation',
    (idCard, cardElement) => {
        api.deleteCard(idCard, cardElement)
            .then((cardElement) => {
                cardElement.deleteElement();
                popupConfirmation.closePopup();
            })
            .catch(() => {
                console.log('error card delete');
            });
    }
);
popupConfirmation.setEventListeners('.popup__close-button_type_confirmation');

const popupWithImage = new PopupWithImage('.popup_type_show-card');
popupWithImage.setEventListeners('.popup__close-button_type_show-card');

function generateCard(data) {
    const card = new Card(data, userInfo.getUserId(), '.element-template', '.element', api, (data) => {
            popupWithImage.openPopup(data);
        },
        (idCard) => {
            popupConfirmation.openPopup(idCard, card);
        });

    return card.generateCard();
}

const popupEditAvatar = new PopupWithForm({
    handleSubmit: (inputValues) => {
        api.editAvatar(inputValues)
            .then(res => {
                userInfo.setUserInfo(res);
                popupEditAvatar.renderSaving(false);
                popupEditAvatar.closePopup();
            })
            .catch(() => {
                console.log('error avatar change');
            });
    },
    handleReset: () => {
        formEditAvatarValidator.resetValidationErrors();
    },
    popupSelector: '.popup_type_edit-avatar'
});
popupEditAvatar.setEventListeners();

const popupAddCard = new PopupWithForm({
    handleSubmit: (inputValues) => {
        api.addCard(inputValues)
            .then(res => {
                cardsList.addItem(generateCard(res));
                popupAddCard.renderSaving(false);
                popupAddCard.closePopup();
            })
            .catch(() => {
                console.log('error add card');
            });
    },
    handleReset: () => {
        formAddCardValidator.resetValidationErrors();
    },
    popupSelector: '.popup_type_add-card'
});
popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm({
    handleSubmit: (inputValues) => {
        api.setUserInfo(inputValues)
            .then(res => {
                userInfo.setUserInfo(res);
                popupAddCard.renderSaving(false);
                popupEditProfile.closePopup();
            })
            .catch(() => {
                console.log('error user info update');
            });
    },
    handleReset: () => {
        formProfileValidator.resetValidationErrors();
    },
    popupSelector: '.popup_type_edit-profile'
});
popupEditProfile.setEventListeners();

formProfileValidator = new FormValidator(selectorNames, popupEditProfileForm);
formProfileValidator.enableValidation();

formAddCardValidator = new FormValidator(selectorNames, popupAddCardForm);
formAddCardValidator.enableValidation();

formEditAvatarValidator = new FormValidator(selectorNames, popupEditAvatarForm);
formEditAvatarValidator.enableValidation();

function fillForm({name, about}) {
    formName.value = name;
    formAbout.value = about;
}

editProfileBtn.addEventListener('click', () => {
    fillForm(userInfo.getUserInfo());
    popupEditProfile.openPopup();
});

addCardBtn.addEventListener('click', () => {
    popupAddCard.openPopup();
});

editAvatarBtn.addEventListener('click', () => {
    popupEditAvatar.openPopup();
});