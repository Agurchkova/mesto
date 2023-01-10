export class Card {
    constructor(data, itemTemplateSelector, handleImage) {
        this._data = data;
        this._itemTemplate = document.querySelector(itemTemplateSelector).content.querySelector('.photo-gallery__container');
        this._itemElement = this._itemTemplate.cloneNode(true);
        this._handleImage = handleImage;
        this._itemDeleteButton = this._itemElement.querySelector('.photo-gallery__trash-button');
        this._itemLikeButton = this._itemElement.querySelector('.photo-gallery__like-button');
        this._itemBigImageButton = this._itemElement.querySelector('.photo-gallery__item-button');
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
        this._itemBigImageButton.addEventListener('click', () => this._handleImage(this._data));
    }
    // создать карточку
    createElement() {
        const itemImage = this._itemElement.querySelector('.photo-gallery__item');
        const itemTitle = this._itemElement.querySelector('.photo-gallery__title');
        itemTitle.textContent = this._data.name;
        itemImage.src = this._data.link;
        itemImage.alt = this._data.name;

        this._setEventListeners();

        return this._itemElement;
    }
};