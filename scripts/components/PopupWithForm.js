import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleSubmitForm }) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputsList = this._popupForm.querySelectorAll('.popup__input');
        this._popupSubmitButton = this._popupForm.querySelector('.popup__save-button');
    }

    //////// Получение данных из формы
    _getInputValues() {
        ///создали пустой объект
        this._inputValues = {};
        ////положили в объект значения всех полей
        this._inputsList.forEach(input => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    /////// Устанавливаем слушатели формы
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleSubmitForm(this._getInputValues());
        })
    }

    ////// Закрывает попап, сбрасывает инпуты
    close() {
        super.close();
        this._popupForm.reset();
    }
}
