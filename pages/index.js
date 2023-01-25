import { initialCards } from "../scripts/utils/initialCards.js";
import Card from "../scripts/components/Card.js";
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";

///////import Popup from './Popup.js';

import {
    popupElements,
    popupEditProfileElement,
    popupEditAdd,
    popupOpenEditProfileElement,
    popupOpenAdd,
    profileName,
    profileJob,
    profileAvatar,
    formElement,
    nameInput,
    jobInput,
    formElementAdd,
    addName,
    addUrl,
    popupBigImage,
    bigImageUrl,
    bigImageCaption,
    itemsContainer,
    config
} from '../scripts/utils/constants.js';


// import './styles/index.css';

////////хранит экземпляры валидаторов
const formValidators = {};

/////// Включение валидации

function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach(formElement => {
        const validator = new FormValidator(config, formElement);
        formValidators[formElement.getAttribute('name')] = validator;
        validator.enableValidation();
    });
}
enableValidation(config);

////////создаем экземпляр класса UserInfo

const userInfo = new UserInfo({
    username: '.profile__title',
    job: '.profile__subtitle'
});


///////Попап просмотра увеличенного изображения 

const handlePopupBigImage = new PopupWithImage('.popup_type_big-image');
handlePopupBigImage.setEventListeners();

///////создаем новую карточку

function createCard(data) {

    const item = new Card(data, '#item-template', handleCardClick);
    const cardElement = item.createElement();
    itemsList.addItem(cardElement);
    // console.log(item.cardElement);
    return cardElement;
};

function handleCardClick(name, link) {
    handlePopupBigImage.open(name, link);
};

///////Создаем экземпляр класса Section
const itemsList = new Section({
    renderer: (item) => {
        itemsList.addItem(createCard(item));
        // console.log("renderer:" + item)
    },
}, '.photo-gallery__items');

itemsList.renderItems(initialCards);


///////// создаем попап с формой редактирования профиля
const popupEditProfile = new PopupWithForm({
    popupSelector: '.popup_type_edit-profile',
    handleSubmitForm: (data) => {
        userInfo.setUserInfo(data);
        popupEditProfile.close();
    }
});

popupEditProfile.setEventListeners();

//////// создаем попап добавления новой карточки

const popupAddNewCard = new PopupWithForm({
    popupSelector: '.popup_type_add-cards',
    handleSubmitForm: (formData) => {
        itemsList.addItem(createCard(formData));
        popupAddNewCard.close();
    }
});
popupAddNewCard.setEventListeners();

// обработчики открытия попапов добавления новой карточки и редактирования профиля

popupOpenAdd.addEventListener('click', () => {
    formValidators['AddNewItem'].resetValidation();
    popupAddNewCard.open();
});



popupOpenEditProfileElement.addEventListener('click', function () {
    formValidators['EditProfilePopupform'].resetValidation();
    ({
        username: nameInput.value,
        job: jobInput.value
    } = userInfo.getUserInfo());

    popupEditProfile.open();
});





///////////////////////старый код////////////////////////////////
// // Открытие попапов
// const openPopup = (popup) => {
//     popup.classList.add('popup_opened');
//     document.addEventListener('keyup', handleKeyUp);
// }

// // Закрытие попапов
// const closePopup = (popup) => {
//     popup.classList.remove('popup_opened');
//     document.removeEventListener('keyup', handleKeyUp);
// }

// // Закрытие попапа крестиком и кликом вне рамок попапа
// popupElements.forEach((popup) => {
//     popup.addEventListener('mousedown', (evt) => {
//         if (evt.target.classList.contains('popup_opened')) {
//             closePopup(popup)
//         }
//         if (evt.target.classList.contains('popup__close-button')) {
//             closePopup(popup)
//         }
//     })
// })

// function open Big Image ====================================================

// function handleImage(data) {

//     bigImageCaption.textContent = data.name;
//     bigImageUrl.src = data.link;
//     bigImageUrl.alt = data.name;

//     openPopup(popupBigImage);
// };


// function render(data) {
//     const newItem = createCard(data);
//     itemsContainer.prepend(newItem);
// };

// //закрытие по кнопке искейп
// function handleKeyUp(evt) {
//     if (evt.key === 'Escape') {
//         const popupOpened = document.querySelector('.popup_opened');
//         closePopup(popupOpened);
//     }
// };


// ////////добавляем слушатели
// popupOpenEditProfileElement.addEventListener('click', () => {
//     formValidators['EditProfilePopupform'].resetValidation();
//     openPopup(popupEditProfileElement);
//     nameInput.value = profileName.textContent;
//     jobInput.value = profileJob.textContent;
// });

// popupOpenAdd.addEventListener('click', () => {
//     formValidators['AddNewItem'].resetValidation();
//     openPopup(popupEditAdd);
// });

// formElement.addEventListener('submit', function (evt) {
//     evt.preventDefault();
//     profileName.textContent = nameInput.value;
//     profileJob.textContent = jobInput.value;
//     closePopup(popupEditProfileElement);
// });

// formElementAdd.addEventListener('submit', function (evt) {
//     evt.preventDefault();

//     ////////Добавляем новый элемент
//     const card = {
//         name: addName.value,
//         link: addUrl.value
//     };

//     render(card);
//     closePopup(popupEditAdd);
//     formElementAdd.reset();
// });