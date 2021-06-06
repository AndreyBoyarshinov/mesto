
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
let popupAddCard = document.querySelector('.popup_type_add-card');
const closePopupAddCard = popupAddCard.querySelector('.popup__close-button_type_add-card');
const popupFormAddCard = popupAddCard.querySelector('.popup__form_type_add-card');
let popupShowCard = document.querySelector('.popup_type_show-card');
const closePopupShowCard = popupShowCard.querySelector('.popup__close-button_type_show-card');

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
const popupPlaceName = popupAddCard.querySelector('.popup__field_text_place').value; /*эта переменная не может быть в глобальной видимости. Она работает после открытия попапа и ввода названия*/
const popupPlaceLink = popupAddCard.querySelector('.popup__field_text_link').value; /*эта переменная не может быть в глобальной видимости. Она работает после открытия попапа и ввода ссылки*/
  e.preventDefault();
  addElement({name: popupPlaceName, link: popupPlaceLink});
  closePopup(popupAddCard);
}

function populateList(elements){
  elements.forEach(element => {
    addElement(element);
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
  popupShowCard.querySelector('.popup__image').setAttribute('src', element.link);
  popupShowCard.querySelector('.popup__image').setAttribute('alt', element.name);
  popupShowCard.querySelector('.popup__place-name').textContent = element.name;
}
  
let elTemplate = document.querySelector('.element-template');

function addElement(element){ /*https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_node_clonenode если верить этой документации, то скрипт написан верно, и функционирует корректно*/
  const elementNew = elTemplate.content.cloneNode(true);
  console.log(element);
  elementNew.querySelector('.element__image').setAttribute('style', 'background-image: url(' + element.link + ')');
  elementNew.querySelector('.element__image').setAttribute('alt', 'background-image: url(' + element.link + ')');
  elementNew.querySelector('.element__title').textContent = element.name;
  elementNew.querySelector('.element__like-button').addEventListener('click', likeElement);
  elementNew.querySelector('.element__delete-button').addEventListener('click', deleteElement);
  elementNew.querySelector('.element__image').addEventListener('click', () => {
    showImage(element);
  });
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
