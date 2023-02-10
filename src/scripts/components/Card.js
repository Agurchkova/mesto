export default class Card {
    constructor(data, userId, itemTemplateSelector, handleCardClick, handleDeleteCard, handleSetLike, handleRemoveLike) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._cardId = data._id;
        this._userId = userId;
        this._likes = data.likes;
        this._handleDeleteCard = handleDeleteCard;
        this._itemOwnerId = data.owner._id;
        this._itemTemplateSelector = itemTemplateSelector;
        this._handleCardClick = handleCardClick;
        this._handleSetLike = handleSetLike;
        this._handleRemoveLike = handleRemoveLike;
    }
    //получение шаблона карточки
    _createCardElement() {
        const cardElement = document.querySelector(this._itemTemplateSelector)
            .content.querySelector('.photo-gallery__container').cloneNode(true);

        return cardElement;
    }

    //поставить лайк
    // _handleLikeButtonClick = () => {
    //     this._itemLikeButton.classList.toggle('photo-gallery__like-button_active');
    // }

    //удалить карточку
    _handleDeleteButtonClick = () => {
        this._itemElement.remove();
        this._itemElement = null;
    }

    //установка слушателей
    _setEventListeners() {
        this._itemLikeButton.addEventListener('click', () => {
            if (this._itemLikeButton.classList.contains('photo-gallery__like-button_active')) {
                this._handleRemoveLike(this._cardId);
            } else {
                this._handleSetLike(this._cardId);
            }
        });
        this._itemDeleteButton.addEventListener('click', () => {
            this._handleDeleteCard(this._cardId);
        });
        this._itemImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    //создать карточку
    createElement() {
        this._itemElement = this._createCardElement();
        this._itemImage = this._itemElement.querySelector('.photo-gallery__item');
        this._itemTitle = this._itemElement.querySelector('.photo-gallery__title');
        this._itemLikeButton = this._itemElement.querySelector('.photo-gallery__like-button');
        this._itemDeleteButton = this._itemElement.querySelector('.photo-gallery__trash-button');
        this._likesCounter = this._itemElement.querySelector('.photo-gallery__like-counter');
        this._itemTitle.textContent = this._name;
        this._itemImage.src = this._link;
        this._itemImage.alt = this._name;
        this._hasTrashButton();
        this._isItemLiked();
        this._likesCounter.textContent = this._likes.length;

        this._setEventListeners();

        return this._itemElement;
    }

    // установка и удаление лайков, изменение количества лайков
    handleItemLike(data) {
        this._likes = data.likes;
        this._likesCounter.textContent = this._likes.length;
        this._itemLikeButton.classList.toggle('photo-gallery__like-button_active');
    }
    // проверяем стоит ли лайк на карточке
    _isItemLiked() {
        if (this._likes.some((user) => {
            return this._userId === user._id;
        })) {
            this._itemLikeButton.classList.add('photo-gallery__like-button_active');
        }
    }

    // проверяем владельца карточки и убираем кнопку корзины
    _hasTrashButton() {
        if (this._userId !== this._itemOwnerId) {
            this._itemDeleteButton.remove();
        }
    };
};
