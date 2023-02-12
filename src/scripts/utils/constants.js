// popups
const popupElements = document.querySelectorAll('.popup');
const popupEditProfileElement = document.querySelector('.popup_type_edit-profile');
const popupEditAdd = document.querySelector('.popup_type_add-cards');
// popups open buttons
const popupOpenEditProfileElement = document.querySelector('.profile__edit-button');
const popupOpenAdd = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
// form fields
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const profileAvatar = document.querySelector('.profile__avatar');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const formElementAdd = document.querySelector('[name="AddNewItem"]');
const formElementEditProfile = document.querySelector('[name="EditProfilePopupform"]');
const idNameInputEditProfile = formElementEditProfile.querySelector('#input-name');
const idJobInputEditProfile = formElementEditProfile.querySelector('#input-job');
const formElementEditAvatar = document.querySelector('[name="EditAvatarform"]');
const addName = formElementAdd.querySelector('.popup__input_type_nameAdd');
const addUrl = formElementAdd.querySelector('.popup__input_type_urlAdd');
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

export {
    popupElements, popupEditProfileElement, popupEditAdd, popupOpenEditProfileElement,
    popupOpenAdd, avatarEditButton, profileName, profileJob, profileAvatar, formElement,
    nameInput, jobInput, idNameInputEditProfile, idJobInputEditProfile, formElementAdd,
    formElementEditProfile, formElementEditAvatar, addName, addUrl, popupBigImage,
    bigImageUrl, bigImageCaption, itemsContainer, config
};