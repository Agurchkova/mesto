export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupCloseButton = this._popup.querySelector('.popup__close-button');
        this._handleEscapeClose = this._handleEscapeClose.bind(this);
    }

    // открытие попапа
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscapeClose);
    }

    // закрытие попапа
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscapeClose);
    }

    // обработка события нажатия на escape для закрытия попапа
    _handleEscapeClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    // устанавка слушателей событий на кнопки попапа для закрытия
    setEventListeners() {
        this._popupCloseButton.addEventListener('click', () => {
            this.close();
        });

        this._popup.addEventListener('mousedown', (event) => {
            if (event.target.classList.contains('popup')) {
                this.close();
            }
        });
    }
}


