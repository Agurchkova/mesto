import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleSubmitForm }) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputsList = this._popupForm.querySelectorAll('.popup__input');
        this._popupSaveButton = this._popupForm.querySelector('.popup__save-button');
        this._popupSaveButtonText = this._popupSaveButton.textContent;
    }

    /// получение значений из формы
    _getInputValues() {
        // создаем пустой объект
        const inputValues = {};
        // кладем в объект значения всех полей
        this._inputsList.forEach(input => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    /// закрывает попап, сбрасывает инпуты
    close() {
        super.close();
        this._popupForm.reset();
    }

    /// установка слушателей формы
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleSubmitForm(this._getInputValues());
        })
    }

    /// отрисовка состояния кнопки пока данные загружаются
    renderLoading(isLoading) {
        if (isLoading) {
            this._popupSaveButton.textContent = 'Сохранение...'
        } else {
            this._popupSaveButton.textContent = this._popupSaveButtonText;
        }
    }
}
