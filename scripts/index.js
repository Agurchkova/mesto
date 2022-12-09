// Объявляем переменные======================================================

// popups
const popupElement = document.querySelectorAll('.popup');
const popupEditProfileElement = document.querySelector('.popup_type_edit-profile');
const popupEditAdd = document.querySelector('.popup_type_add-cards');
// popups close buttons
const popupCloseEditProfileElement = popupEditProfileElement.querySelector('.popup__close-button');
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
const formElementAdd = document.querySelector('[name="AddNewItem"]');
const addName = formElementAdd.querySelector('.popup__input_type_nameAdd');
const addUrl = formElementAdd.querySelector('.popup__input_type_urlAdd');
// popup big-Image
const popupBigImage = document.querySelector('.popup_type_big-image');
const bigImageUrl = document.querySelector('.popup__big-image');
const bigImageCaption = document.querySelector('.popup__image-caption');
const popupCloseBigImage = popupBigImage.querySelector('[name="closebigimage"]');
// Add template
const itemsContainer = document.querySelector('.photo-gallery__items');
const itemTemplate = document.querySelector('#item-template').content.querySelector('.photo-gallery__container');

// Открытие попапов
const openPopup = (popup) => {
    popup.classList.add('popup_opened');
}

// Закрытие попапов 
const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
}

// Закрытие попапа крестиком и кликом вне рамок попапа
popupElement.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {
            closePopup(popup)
        }
    })
})

// поставить лайк
const handleLikeButtonClick = (e) => {
    e.target.classList.toggle('photo-gallery__like-button_active')
}

// удалить фотографию
const handleDeleteButtonClick = (e) => {
    e.target.closest('.photo-gallery__container').remove()
}

// function open Big Image ====================================================

function handleImage(item) {

    bigImageCaption.textContent = item.target.alt;
    bigImageUrl.src = item.target.src;
    bigImageUrl.alt = item.target.alt;

    openPopup(popupBigImage);
}

// Init cards on canvas =======================================================

function createElement(item) {

    const itemElement = itemTemplate.cloneNode(true);
    const itemTitle = itemElement.querySelector('.photo-gallery__title');
    const itemImage = itemElement.querySelector('.photo-gallery__item');

    const itemBigImageButton = itemElement.querySelector('.photo-gallery__item-button');

    const itemDeleteButton = itemElement.querySelector('.photo-gallery__trash-button')
    const itemLikeButton = itemElement.querySelector('.photo-gallery__like-button')

    itemDeleteButton.addEventListener('click', handleDeleteButtonClick)
    itemLikeButton.addEventListener('click', handleLikeButtonClick)
    itemBigImageButton.addEventListener('click', handleImage)

    itemTitle.textContent = item.name;
    itemImage.src = item.link;
    itemImage.alt = item.name;

    
    return itemElement;

}

const list = document.querySelector('.photo-gallery__items'); //получаем родительский элемент карточки

initialCards.forEach(render);

function render(data) {
    const newItem = createElement(data);
    list.prepend(newItem);
}

//добавляем слушателей
popupOpenEditProfileElement.addEventListener('click', () => {
    openPopup(popupEditProfileElement);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    });
    
popupOpenAdd.addEventListener('click', () =>
openPopup(popupEditAdd));

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