
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

const editProfileBtn = document.querySelector('.profile__edit');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const closePopupEditProfile = popupEditProfile.querySelector('.popup__close-button_type_profile');
const profileName = document.querySelector('.profile__title');
const profileStatus = document.querySelector('.profile__subtitle');
const popupUserName = popupEditProfile.querySelector('.popup__field_text_name');
const popupUserStatus = popupEditProfile.querySelector('.popup__field_text_status');
const popupFormProfile = popupEditProfile.querySelector('.popup__form_type_profile');
const elementList = document.querySelector('.elements');
const addCardBtn = document.querySelector('.profile__add');
const popupAddCard = document.querySelector('.popup_type_add-card');
const closePopupAddCard = popupAddCard.querySelector('.popup__close-button_type_add-card');
const popupFormAddCard = popupAddCard.querySelector('.popup__form_type_add-card');
const popupShowCard = document.querySelector('.popup_type_show-card');
const closePopupShowCard = popupShowCard.querySelector('.popup__close-button_type_show-card');
const popupPlaceField = popupAddCard.querySelector('.popup__field_text_place');
const popupLinkField = popupAddCard.querySelector('.popup__field_text_link');
const popupShowCardImage = popupShowCard.querySelector('.popup__image');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function fillInProfileForm() {
  popupUserName.value = profileName.textContent;
  popupUserStatus.value = profileStatus.textContent;
}

function resetAddCardForm() {
  popupFormAddCard.reset();
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function submitFormEditProfile(e) {
  e.preventDefault();
  profileName.textContent = popupUserName.value;
  profileStatus.textContent = popupUserStatus.value;
  closePopup(popupEditProfile);
}

function submitFormAddCard(e) {
  e.preventDefault();
  addNewElement({
    name: popupPlaceField.value,
    link: popupLinkField.value
  });
  closePopup(popupAddCard);
}

function populateList(elements){
  elements.forEach(element => {
    addNewElement(element);
  });
}

function likeElement(e){
  e.target.classList.toggle('element__like-button_active');
}

function deleteElement(e){
  e.target.closest('.element').remove();
}

function showImage(element){
  openPopup(popupShowCard);
  popupShowCardImage.setAttribute('src', element.link);
  popupShowCardImage.setAttribute('alt', element.name);
  popupShowCard.querySelector('.popup__place-name').textContent = element.name;
}
  
const elTemplate = document.querySelector('.element-template');

function createNewElementByTemplate(element) {
  const newElement = elTemplate.content.cloneNode(true);
  const newElementImage = newElement.querySelector('.element__image');
  newElementImage.setAttribute('style', 'background-image: url(' + element.link + ')');
  newElementImage.setAttribute('alt', 'background-image: url(' + element.link + ')');
  newElementImage.addEventListener('click', () => {
    showImage(element);
  });

  newElement.querySelector('.element__title').textContent = element.name;
  newElement.querySelector('.element__like-button').addEventListener('click', likeElement);
  newElement.querySelector('.element__delete-button').addEventListener('click', deleteElement);
  return newElement;
}

function addNewElement(element){
  console.log(element);
  const elementNew = createNewElementByTemplate(element);
  elementList.prepend(elementNew);
}

populateList(initialCards);

editProfileBtn.addEventListener('click', () => {
  fillInProfileForm();
  openPopup(popupEditProfile);
});

closePopupEditProfile.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

popupEditProfile.addEventListener('click', (e) => {
  if(e.currentTarget === e.target)
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
  if(e.currentTarget === e.target)
    closePopup(popupAddCard);
});

popupFormAddCard.addEventListener('submit', submitFormAddCard);

closePopupShowCard.addEventListener('click', () => {
  closePopup(popupShowCard);
});

popupShowCard.addEventListener('click', (e) => {
  if(e.currentTarget === e.target)
    closePopup(popupShowCard);
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closePopup(popupShowCard);
  }
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closePopup(popupAddCard);
  }
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closePopup(popupEditProfile);
  }
});
