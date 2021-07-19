import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import UserInfo from './components/UserInfo.js';
import { initialCards, selectorNames }  from './utils.js';
import '../pages/index.css';

const editProfileBtn = document.querySelector('.profile__edit');
const addCardBtn = document.querySelector('.profile__add');
let formProfileValidator, formAddCardValidator;

const userInfo = new UserInfo({nameSelector: '.profile__title', statusSelector: '.profile__subtitle'});

const popupWithImage = new PopupWithImage('.popup_type_show-card');
popupWithImage.setEventListeners('.popup__close-button_type_show-card');

const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '.element-template', '.element', (item) => {
            popupWithImage.openPopup(item);
        });

        const cardElement = card.generateCard();
        cardsList.addItem(cardElement);
    },
    containerSelector: '.elements__list'
});

const popupAddCard = new PopupWithForm({
    handleSubmit: (inputValues) => {
        const card = new Card(inputValues, '.element-template', '.element', (inputValues) => {
            popupWithImage.openPopup(inputValues);
        });

        const cardElement = card.generateCard();
        cardsList.addItem(cardElement);

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