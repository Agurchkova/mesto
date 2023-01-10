import { initialCards } from "./cards.js";
import { Card } from "./card.js";
import { FormValidator } from './FormValidator.js';

// Объявляем переменные======================================================

// popups
const popupElements = document.querySelectorAll('.popup');
const popupEditProfileElement = document.querySelector('.popup_type_edit-profile');
const popupEditAdd = document.querySelector('.popup_type_add-cards');
// popups open buttons
const popupOpenEditProfileElement = document.querySelector('.profile__edit-button');
const popupOpenAdd = document.querySelector('.profile__add-button');
// form fields
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
// form fields
const formElementEditProfile = document.querySelector('[name="EditProfilePopupform"]');
const formElementAdd = document.querySelector('[name="AddNewItem"]');
const addName = formElementAdd.querySelector('.popup__input_type_nameAdd');
const addUrl = formElementAdd.querySelector('.popup__input_type_urlAdd');
// popups save button
const buttonSave = formElementAdd.querySelector('.popup__save-button');
// popup big-Image
const popupBigImage = document.querySelector('.popup_type_big-image');
const bigImageUrl = document.querySelector('.popup__big-image');
const bigImageCaption = document.querySelector('.popup__image-caption');
// Add template
const itemsContainer = document.querySelector('.photo-gallery__items');
// Object with selectors
const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const validationPopupEditProfile = new FormValidator(config, formElementEditProfile);
validationPopupEditProfile.enableValidation();

const validationPopupAdd = new FormValidator(config, formElementAdd);
validationPopupAdd.enableValidation();

// Открытие попапов
const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keyup', handleKeyUp);
}

// Закрытие попапов 
const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', handleKeyUp);
}

// Закрытие попапа крестиком и кликом вне рамок попапа
popupElements.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {
            closePopup(popup)
        }
    })
})

// function open Big Image ====================================================

function handleImage(data) {

    bigImageCaption.textContent = data.name;
    bigImageUrl.src = data.link;
    bigImageUrl.alt = data.name;

    openPopup(popupBigImage);
}


initialCards.forEach(render);

function render(data) {
    const item = new Card(data, '#item-template', handleImage);
    const newItem = item.createElement();
    itemsContainer.prepend(newItem);
}

//закрытие по кнопке искейп
function handleKeyUp(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}

//добавляем слушатели
popupOpenEditProfileElement.addEventListener('click', () => {
    validationPopupEditProfile.resetFormErrors();
    openPopup(popupEditProfileElement);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});

popupOpenAdd.addEventListener('click', () => {
    validationPopupAdd.resetFormErrors();
    buttonSave.classList.add('popup__save-button_disabled');
    buttonSave.setAttribute('disabled', true);
    openPopup(popupEditAdd);
});

formElement.addEventListener('submit', function SubmitformHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEditProfileElement);
});

formElementAdd.addEventListener('submit', function SubmitformHandler(evt) {
    evt.preventDefault();

    // Добавляем новый элемент
    const card = {
        name: addName.value,
        link: addUrl.value
    };

    render(card);
    closePopup(popupEditAdd);
    formElementAdd.reset();
});