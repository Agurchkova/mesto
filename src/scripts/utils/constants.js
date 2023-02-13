// popups open buttons
const popupOpenEditProfileElement = document.querySelector('.profile__edit-button');
const popupOpenAdd = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
// form fields
const formElementAdd = document.querySelector('[name="AddNewItem"]');
const formElementEditProfile = document.querySelector('[name="EditProfilePopupform"]');
const idNameInputEditProfile = formElementEditProfile.querySelector('#input-name');
const idJobInputEditProfile = formElementEditProfile.querySelector('#input-job');
const formElementEditAvatar = document.querySelector('[name="EditAvatarform"]');
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
    popupOpenEditProfileElement,
    popupOpenAdd,
    avatarEditButton,
    idNameInputEditProfile,
    idJobInputEditProfile,
    formElementAdd,
    formElementEditProfile,
    formElementEditAvatar,
    config
};