import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleSubmitForm }) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputsList = this._popupForm.querySelectorAll('.popup__input');
    }

    /// Получение данных из формы
    _getInputValues() {
        // создаем пустой объект
        const inputValues = {};
        // кладем в объект значения всех полей
        this._inputsList.forEach(input => {
            inputValues[input.name] = input.value;
        });

        return inputValues;
    }

    /// Закрывает попап, сбрасывает инпуты
    close() {
        super.close();
        this._popupForm.reset();
    }

    /// Установка слушателей формы
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleSubmitForm(this._getInputValues());
            super.close();
        })
    }


}
