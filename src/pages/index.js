import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import UserInfo from '../scripts/components/UserInfo.js';
import { selectorNames }  from '../utils/utils.js';
import { initialCards }  from '../utils/constants.js';
import './index.css';

const editProfileBtn = document.querySelector('.profile__edit');
const addCardBtn = document.querySelector('.profile__add');
let formProfileValidator, formAddCardValidator;

const userInfo = new UserInfo({nameSelector: '.profile__title', statusSelector: '.profile__subtitle'});

const popupWithImage = new PopupWithImage('.popup_type_show-card');
popupWithImage.setEventListeners('.popup__close-button_type_show-card');

function createCard(data) {
    const card = new Card(data, '.element-template', '.element', (context) => {
        popupWithImage.openPopup(context);
    });

    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
}

const cardsList = new Section({
    items: initialCards,
    renderer: createCard,
    containerSelector: '.elements__list'
});

const popupAddCard = new PopupWithForm({
    handleSubmit: (inputValues) => {
        createCard(inputValues);
        popupAddCard.closePopup();
    },
    handleReset: () => {
        formAddCardValidator.resetValidationErrors();
    },
    popupSelector: '.popup_type_add-card',
    formSelector: '.popup__form_type_add-card'
});

popupAddCard.setEventListeners('.popup__close-button_type_add-card');

const popupEditProfile = new PopupWithForm({
    handleSubmit: (inputValues) => {
        userInfo.setUserInfo(inputValues);
        popupEditProfile.closePopup();
    },
    handleReset: () => {
        formProfileValidator.resetValidationErrors();
    },
    popupSelector: '.popup_type_edit-profile',
    formSelector: '.popup__form_type_profile'
});

popupEditProfile.setEventListeners('.popup__close-button_type_profile');

cardsList.renderItems();

formProfileValidator = new FormValidator(selectorNames, popupEditProfile._form);
formProfileValidator.enableValidation();

formAddCardValidator = new FormValidator(selectorNames, popupAddCard._form);
formAddCardValidator.enableValidation();

editProfileBtn.addEventListener('click', () => {
    popupEditProfile.fillForm(userInfo.getUserInfo());
    popupEditProfile.openPopup();
});

addCardBtn.addEventListener('click', () => {
    popupAddCard.openPopup();
});