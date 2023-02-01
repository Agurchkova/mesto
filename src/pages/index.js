import './index.css';
import { initialCards } from "../scripts/utils/initialCards.js";
import Card from "../scripts/components/Card.js";
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
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

/////// хранит экземпляры валидаторов
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

/////// создаем экземпляр класса UserInfo
const userInfo = new UserInfo({
    profileNameSelector: '.profile__title',
    profileJobSelector: '.profile__subtitle'
});

/////// создаем новую карточку
function renderCard(data) {

    const item = new Card(data, '#item-template', handleCardClick);
    const cardElement = item.createElement();
    itemsList.addItem(cardElement);
};

function handleCardClick(name, link) {
    handlePopupBigImage.open(name, link);
};

/////// Создаем экземпляр класса Section
const itemsList = new Section({
    items: initialCards,
    renderer: renderCard
}, '.photo-gallery__items');

itemsList.renderItems();

/////// создаем попап с формой редактирования профиля
const popupEditProfile = new PopupWithForm({
    popupSelector: '.popup_type_edit-profile',
    handleSubmitForm: (data) => {
        userInfo.setUserInfo(data);
    }
});

popupEditProfile.setEventListeners();

/////// создаем попап добавления новой карточки
const popupAddNewCard = new PopupWithForm({
    popupSelector: '.popup_type_add-cards',
    handleSubmitForm: (formData) => {
        renderCard(formData);
    }
});
popupAddNewCard.setEventListeners();

/////// попап просмотра увеличенного изображения 

const handlePopupBigImage = new PopupWithImage('.popup_type_big-image');
handlePopupBigImage.setEventListeners();

/////// обработчики открытия попапов добавления новой карточки и редактирования профиля

popupOpenAdd.addEventListener('click', () => {
    formValidators[formElementAdd.getAttribute('name')].resetValidation();
    popupAddNewCard.open();
});

popupOpenEditProfileElement.addEventListener('click', function () {
    formValidators[formElement.getAttribute('name')].resetValidation();
    ({
        username: nameInput.value,
        job: jobInput.value
    } = userInfo.getUserInfo());

    popupEditProfile.open();
});