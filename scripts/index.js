const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

/// Edit profile =======================================================================

// popups
const popupEditProfileElement = document.querySelector('.popup_type_edit-profile');

// popups close buttons
const popupCloseEditProfileElement = popupEditProfileElement.querySelector('.popup__close-button');

// popups open buttons
const popupOpenEditProfileElement = document.querySelector('.profile__edit-button');

// form fields
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');


const closePopup = function () {
    popupEditProfileElement.classList.remove('popup_opened');
}

const closePopupByClickOnOverlay = function (event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    closePopup();
}

popupOpenEditProfileElement.addEventListener('click', function () {
    popupEditProfileElement.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});

popupCloseEditProfileElement.addEventListener('click', function () {
    popupEditProfileElement.classList.remove('popup_opened');
});

popupEditProfileElement.addEventListener('click', function (event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    closePopup();
});

formElement.addEventListener('submit', function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
});

/// add card ==================================================================

// popups
const popupEditAdd = document.querySelector('.popup_type_add-cards');

// popups close buttons
const popupCloseAdd = popupEditAdd.querySelector('[name="closeButtonAdd"]');

// popups open buttons
const popupOpenAdd = document.querySelector('.profile__add-button');

// form fields
const formElementAdd = document.querySelector('[name="AddNewItem"]');
let addName = formElementAdd.querySelector('.popup__input_type_nameAdd');
let addUrl = formElementAdd.querySelector('.popup__input_type_urlAdd');


const closePopupAdd = function () {
    popupEditAdd.classList.remove('popup_opened');
}

const closePopupByClickOnOverlayAdd = function (event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    closePopupAdd();
}

popupOpenAdd.addEventListener('click', function () {
    popupEditAdd.classList.add('popup_opened');
});

popupCloseAdd.addEventListener('click', function () {
    popupEditAdd.classList.remove('popup_opened');
});

popupEditAdd.addEventListener('click', function (event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    closePopupAdd();
});

formElementAdd.addEventListener('submit', function formSubmitHandler(evt) {
    evt.preventDefault();

    // Добавляем новый элемент
    let card = {
        name: addName.value,
        link: addUrl.value
    };

    render(card);
    closePopupAdd();
});

// open Big Image ========================================================================

// popup big-Image
const popupBigImage = document.querySelector('.popup_type_big-image');

const BigImageUrl = document.querySelector('.popup__big-image');
const BigImageCaption = document.querySelector('.popup__image-caption');
const popupCloseBigImage = popupBigImage.querySelector('[name="closebigimage"]');

const OpenpopupBigImage = function (event) {
    popupBigImage.classList.add('popup_opened');
}


popupCloseBigImage.addEventListener('click', function () {
    popupBigImage.classList.remove('popup_opened');
});

const ClosepopupBigImage = function () {
    popupBigImage.classList.remove('popup_opened');
}

// //закрытие вне области картинки
const ClosepopupBigImageByClickOnOverlay = function (event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    ClosepopupBigImage();
}

// BigImage.addEventListener('click', OpenpopupBigImage);
popupCloseBigImage.addEventListener('click', ClosepopupBigImage);
popupBigImage.addEventListener('click', ClosepopupBigImageByClickOnOverlay);



/// Init cards on canvas ============================================================================

const itemsContainer = document.querySelector('.photo-gallery__items');
const itemTemplate = document.querySelector('#item-template').content.querySelector('.photo-gallery__container');

const handleLikeButtonClick = (e) => {
    e.target.classList.toggle('photo-gallery__like-button_active')
}

const handleDeleteButtonClick = (e) => {
    e.target.closest('.photo-gallery__container').remove()
}

// function open Big Image =======================================================================

function handleImage(item) {

    OpenpopupBigImage(item);

    BigImageCaption.textContent = item.target.alt;
    BigImageUrl.src = item.target.src;
    BigImageUrl.alt = item.target.alt;
    console.log(item.target.alt)
}


function createElement(item) {

    const itemElement = itemTemplate.cloneNode(true);
    const itemTitle = itemElement.querySelector('.photo-gallery__title');
    const itemImage = itemElement.querySelector('.photo-gallery__item');
    const itemBigImageButton = itemElement.querySelector('.photo-gallery__item-button');

    const itemDeleteButton = itemElement.querySelector('.photo-gallery__trash-button')
    const itemLikeButton = itemElement.querySelector('.photo-gallery__like-button')

    itemDeleteButton.addEventListener('click', handleDeleteButtonClick)
    itemLikeButton.addEventListener('click', handleLikeButtonClick)

    itemTitle.textContent = item.name;
    itemImage.src = item.link;
    itemImage.alt = item.name;

    itemBigImageButton.addEventListener('click', handleImage)

    return itemElement;

}

const list = document.querySelector('.photo-gallery__items'); //получаем родительский элемент карточки

initialCards.forEach(render);

function render(data) {
    const newItem = createElement(data);
    list.prepend(newItem);
}