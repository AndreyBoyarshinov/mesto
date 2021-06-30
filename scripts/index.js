const initialCards = [
    {
        name: 'Дом Севастьянова',
        link: 'https://top10.travel/wp-content/uploads/2017/06/dom-sevastyanova.jpg'
    },
    {
        name: 'Театр оперы и балета',
        link: 'https://top10.travel/wp-content/uploads/2017/06/teatr-opery-baleta.jpg'
    },
    {
        name: 'Екатеринбургский цирк',
        link: 'https://top10.travel/wp-content/uploads/2017/06/ekaterinburgskiy-tsirk.jpg'
    },
    {
        name: 'Памятник клавиатуре',
        link: 'https://top10.travel/wp-content/uploads/2017/06/pamyatnik-klaviature.jpg'
    },
    {
        name: 'Памятник Татищеву и де Геннину',
        link: 'https://top10.travel/wp-content/uploads/2017/06/pamyatnik-tatishhevu-genninu.jpg'
    },
    {
        name: 'Здание Свердловского горсовета',
        link: 'https://top10.travel/wp-content/uploads/2017/06/zdanie-sverdlovskogo-gorsoveta.jpg'
    }
];

import Card from './Card.js';
import FormValidator from './FormValidator.js';

const editProfileBtn = document.querySelector('.profile__edit');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const closePopupEditProfile = popupEditProfile.querySelector('.popup__close-button_type_profile');
const profileName = document.querySelector('.profile__title');
const profileStatus = document.querySelector('.profile__subtitle');
const popupUserName = popupEditProfile.querySelector('.popup__field_text_name');
const popupUserStatus = popupEditProfile.querySelector('.popup__field_text_status');
const popupFormProfile = popupEditProfile.querySelector('.popup__form_type_profile');
const elementList = document.querySelector('.elements__list');
const addCardBtn = document.querySelector('.profile__add');
const popupAddCard = document.querySelector('.popup_type_add-card');
const closePopupAddCard = popupAddCard.querySelector('.popup__close-button_type_add-card');
const popupFormAddCard = popupAddCard.querySelector('.popup__form_type_add-card');
const popupPlaceField = popupAddCard.querySelector('.popup__field_text_place');
const popupLinkField = popupAddCard.querySelector('.popup__field_text_link');
export const popupShowCard = document.querySelector('.popup_type_show-card');
const closePopupShowCard = popupShowCard.querySelector('.popup__close-button_type_show-card');
export const popupImage = popupShowCard.querySelector('.popup__image');
export const popupImageName = popupShowCard.querySelector('.popup__place-name');



export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup);
    }
}


function fillInProfileForm() {
    resetValidationErrors(popupFormProfile);
    popupUserName.value = profileName.textContent;
    popupUserStatus.value = profileStatus.textContent;
}

function resetValidationErrors(form) {
    const inputsList = Array.from(form.querySelectorAll('.popup__field'));
    const errorsList = Array.from(form.querySelectorAll('.popup__field-error'));
    const btnSubmit = form.querySelector('.popup__button');

    inputsList.forEach((input) => {
        input.classList.remove('popup__field_type_error');
    });

    errorsList.forEach((errMsg) => {
        errMsg.textContent = '';
        errMsg.classList.remove('popup__field-error_active');
    });

    btnSubmit.classList.add('popup__button_disabled');
    btnSubmit.setAttribute('disabled', true);
}

function resetAddCardForm() {
    popupFormAddCard.reset();
    resetValidationErrors(popupFormAddCard);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

function submitFormEditProfile(e) {
    e.preventDefault();
    profileName.textContent = popupUserName.value;
    profileStatus.textContent = popupUserStatus.value;
    closePopup(popupEditProfile);
}

function submitFormAddCard(e) {
    e.preventDefault();
    const cardElement = new Card({name: popupPlaceField.value, link: popupLinkField.value}, '.element-template');
    addElement(elementList, cardElement.generateCard());
    closePopup(popupAddCard);
}

function populateList(elements) {
    elements.forEach(element => {
        const cardElement = new Card(element, '.element-template');
        addElement(elementList, cardElement.generateCard());
    });
}

function addElement(container, element) {
    container.prepend(element);
}

populateList(initialCards);

const setValidation = (selectorNames) => {
    const formList = Array.from(document.querySelectorAll(selectorNames.formSelector));

    formList.forEach((formElement) => {
        const formValidator = new FormValidator(selectorNames, formElement);
        formValidator.enableValidation();
    });
};

setValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field-error_active'
});

editProfileBtn.addEventListener('click', () => {
    fillInProfileForm();
    openPopup(popupEditProfile);
});

closePopupEditProfile.addEventListener('click', () => {
    closePopup(popupEditProfile);
});

popupEditProfile.addEventListener('click', (e) => {
    if (e.currentTarget === e.target)
        closePopup(popupEditProfile);
});

popupFormProfile.addEventListener('submit', submitFormEditProfile);

addCardBtn.addEventListener('click', () => {
    resetAddCardForm();
    openPopup(popupAddCard);
});

closePopupAddCard.addEventListener('click', () => {
    closePopup(popupAddCard);
});

popupAddCard.addEventListener('click', (e) => {
    if (e.currentTarget === e.target)
        closePopup(popupAddCard);
});

popupFormAddCard.addEventListener('submit', submitFormAddCard);

closePopupShowCard.addEventListener('click', () => {
    closePopup(popupShowCard);
});

popupShowCard.addEventListener('click', (e) => {
    if (e.currentTarget === e.target)
        closePopup(popupShowCard);
});


