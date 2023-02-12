// import './index.css';
import Card from "../scripts/components/Card.js";
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js";
import {
    popupElements,
    popupEditProfileElement,
    popupEditAdd,
    popupOpenEditProfileElement,
    popupOpenAdd,
    avatarEditButton,
    profileName,
    profileJob,
    profileAvatar,
    formElement,
    nameInput,
    jobInput,
    idNameInputEditProfile,
    idJobInputEditProfile,
    formElementAdd,
    formElementEditProfile,
    formElementEditAvatar,
    addName,
    addUrl,
    popupBigImage,
    bigImageUrl,
    bigImageCaption,
    itemsContainer,
    config
} from '../scripts/utils/constants.js';

/////// подключение Api
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
    headers: {
        authorization: `ed6511d1-8679-4d0e-906b-e0ea7dcb3ddf`,
        'Content-Type': 'application/json'
    }
});

let userId;

/////// получаем карточки с сервера и данные о пользователе 
Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([initialCards, userData]) => {
        userInfo.setUserInfo(userData);
        userId = userData._id;
        itemsList.renderItems(initialCards);
    })
    .catch((err) => {
        console.error(err);
    });

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
    profileJobSelector: '.profile__subtitle',
    profileAvatarSelector: '.profile__avatar'
});


/////// создаем новую карточку
function renderCard(data) {

    const item = new Card({
        data: data,
        itemTemplateSelector: '#item-template',
        userId: userId,
        handleCardClick: (name, link) => {
            handlePopupBigImage.open(name, link);
        },
        handleDeleteItem: (itemId) => {
            popupConfirmDelete.open();
            popupConfirmDelete.handleCallback(() => {
                api.deleteCard(itemId)
                    .then(() => {
                        popupConfirmDelete.close();
                        item.deleteCard();
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            });
        },
        handleSetLike: (itemId) => {
            api.setLike(itemId)
                .then((data) => {
                    item.handleItemLike(data);
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        handleRemoveLike: (itemId) => {
            api.deleteLike(itemId)
                .then((data) => {
                    item.handleItemLike(data);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    });
    const cardElement = item.createElement();
    itemsList.addItem(cardElement);
};

/////// создаем экземпляр класса Section
const itemsList = new Section({
    renderer: renderCard
}, '.photo-gallery__items');


/////// создаем попап подтверждения удаления карточки
const popupConfirmDelete = new PopupWithConfirmation({
    popupSelector: '.popup_type_confirmation'
});
popupConfirmDelete.setEventListeners();

/////// создаем попап с формой редактирования профиля
const popupEditProfile = new PopupWithForm({
    popupSelector: '.popup_type_edit-profile',
    handleSubmitForm: (formData) => {
        popupEditProfile.loading(true);
        api.editUserData(formData)
            .then((formData) => {
                userInfo.setUserInfo(formData);
                popupEditProfile.close();
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                popupEditProfile.loading(false);
            });
    }
});

popupEditProfile.setEventListeners();

/////// создаем попап добавления новой карточки
const popupAddNewCard = new PopupWithForm({
    popupSelector: '.popup_type_add-cards',
    handleSubmitForm: (formData) => {
        popupAddNewCard.loading(true);
        api.addItem(formData)
            .then((formData) => {
                renderCard(formData);
                popupAddNewCard.close();
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                popupAddNewCard.loading(false);
            });
    }
});
popupAddNewCard.setEventListeners();

/////// создаем попап просмотра увеличенного изображения 
const handlePopupBigImage = new PopupWithImage('.popup_type_big-image');
handlePopupBigImage.setEventListeners();

/////// создаем попап редактирования аватара
const popupEditAvatar = new PopupWithForm({
    popupSelector: '.popup_type_avatar',
    handleSubmitForm: (data) => {
        popupEditAvatar.loading(true);
        api.editAvatar(data)
            .then((avatar) => {
                userInfo.setUserInfo(avatar);
                popupEditAvatar.close();
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                popupEditAvatar.loading(false);
            });
    }
});
popupEditAvatar.setEventListeners();


/////// обработчики открытия попапов добавления новой карточки, 
/////// редактирования профиля и аватара пользователя

popupOpenAdd.addEventListener('click', () => {
    formValidators[formElementAdd.getAttribute('name')].resetValidation();
    popupAddNewCard.open();
});

popupOpenEditProfileElement.addEventListener('click', () => {
    formValidators[formElementEditProfile.getAttribute('name')].resetValidation();
    ({
        username: idNameInputEditProfile.value,
        job: idJobInputEditProfile.value
    } = userInfo.getUserInfo());

    popupEditProfile.open();
});

avatarEditButton.addEventListener('click', () => {

    popupEditAvatar.open();
    formValidators[formElementEditAvatar.getAttribute('name')].resetValidation();
});