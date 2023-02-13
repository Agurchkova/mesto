import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor({ popupSelector }) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector('.popup__form');
    }

    /// колбек на удаление карточки
    handleCallback(removing) {
        this._handleSubmitCallback = removing;
    }

    // /// удаление карточки по кнопке подтверждения
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('click', (event) => {
            event.preventDefault();
            this._handleSubmitCallback();
        });
    }

}