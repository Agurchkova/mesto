//функция проверяет валидность инпутов
function checkInputValidity(input, config) {
    if (!input.validity.valid) {
        showInputError(input, config);
    } else {
        hideInputError(input, config);
    }
}

//добавление класса с ошибкой
function showInputError(input, restConfig) {
    const error = document.querySelector(`#${input.id}-error`);
    input.classList.add(restConfig.inputErrorClass);
    error.classList.add(restConfig.errorClass);
    error.textContent = input.validationMessage;
}

//удаление класса с ошибкой
function hideInputError(input, restConfig) {
    const error = document.querySelector(`#${input.id}-error`);
    input.classList.remove(restConfig.inputErrorClass);
    error.classList.remove(restConfig.errorClass);
    error.textContent = '';
}

//функция меняет состояние кнопки сохранения
function toggleButtonState(inputs, buttonSave, config) {

    const isFormValid = inputs.every(input => input.validity.valid);

    if (isFormValid) {
        buttonSave.classList.remove(config.inactiveButtonClass);
        buttonSave.removeAttribute('disabled');
    } else {
        buttonSave.classList.add(config.inactiveButtonClass);
        buttonSave.setAttribute('disabled', true);
    }
}

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const enableValidation = (config) => {
    const { formSelector, inputSelector, submitButtonSelector, ...restConfig } = config;
    const forms = [...document.querySelectorAll(config.formSelector)];

    forms.forEach(form => {
        const inputs = [...form.querySelectorAll(config.inputSelector)];
        const buttonSave = form.querySelector(config.submitButtonSelector);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
        })

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                checkInputValidity(input, restConfig);
                toggleButtonState(inputs, buttonSave, restConfig);
            })
        })
    })

}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});
