export default class Card {
    constructor(data, itemTemplateSelector, handleCardClick) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._itemTemplate = document.querySelector(itemTemplateSelector).content.querySelector('.photo-gallery__container');
        this._itemElement = this._itemTemplate.cloneNode(true);
        this._itemLikeButton = this._itemElement.querySelector('.photo-gallery__like-button');
        this._itemDeleteButton = this._itemElement.querySelector('.photo-gallery__trash-button');
        this._itemBigImageButton = this._itemElement.querySelector('.photo-gallery__item-button');
        this._handleCardClick = handleCardClick;
    }
    //поставить лайк
    _handleLikeButtonClick = () => {
        this._itemLikeButton.classList.toggle('photo-gallery__like-button_active');
    }
    //удалить карточку
    _handleDeleteButtonClick = () => {
        this._itemElement.remove();
    }
    //установка слушателей
    _setEventListeners() {
        this._itemLikeButton.addEventListener('click', this._handleLikeButtonClick);
        this._itemDeleteButton.addEventListener('click', this._handleDeleteButtonClick);
        this._itemImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        });
    }
    // создать карточку
    createElement() {
        this._itemImage = this._itemElement.querySelector('.photo-gallery__item');
        this._itemTitle = this._itemElement.querySelector('.photo-gallery__title');
        this._itemTitle.textContent = this._name;
        this._itemImage.src = this._link;
        this._itemImage.alt = this._name;

        this._setEventListeners();

        return this._itemElement;
    }
};

