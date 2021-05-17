
let popup = document.querySelector('.popup')
let form = document.querySelector('.popup__form')
let popupTitle = document.querySelector('#popupTitle')
let popupSubtitle = document.querySelector('#popupSubtitle')
let openPopupButton = document.querySelector('.profile__edit')
let buttonClose = document.querySelector('#popupClose')
let profileTitle = document.querySelector('.profile__title')
let profileSubtitle = document.querySelector('.profile__subtitle')

function open() {
  popup.classList.add('popup_opened')
  popupTitle.value = profileTitle.textContent
  popupSubtitle.value =  profileSubtitle.textContent
}
function close() {
  popup.classList.remove('popup_opened')
}

function formSubmitHandler (submit) {
  submit.preventDefault();
  profileTitle.textContent = popupTitle.value
  profileSubtitle.textContent = popupSubtitle.value
  close()
}

openPopupButton.addEventListener('click', open)
buttonClose.addEventListener('click', close)
form.addEventListener('submit', formSubmitHandler)