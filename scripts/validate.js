// показывает ошибку
const checkInputValidity = (input, config) => {
    const error = document.querySelector(`#${input.id}-error`);

    if (input.validity.valid) {
        error.textContent = '';
        error.classList.remove(config.errorClass);
        input.classList.remove(config.inputErrorClass);
    } else {
        error.textContent = input.validationMessage;
        error.classList.add(config.errorClass);
        input.classList.add(config.inputErrorClass);
    }
}

const toggleButtonState = (inputs, button, config) => {
    const isFormValid = inputs.every(input => input.validity.valid);

    if (isFormValid) {
        button.classList.remove(config.inactiveButtonClass);
        button.disabled = '';
    } else {
        button.classList.add(config.inactiveButtonClass);
        button.disabled = 'disabled';
    }

}

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const enableValidation = (config) => {
    const { formSelector, inputSelector, submitButtonSelector, ...restConfig } = config;
    const forms = [...document.querySelectorAll(config.formSelector)];

    forms.forEach(form => {
        const inputs = [...form.querySelectorAll(config.inputSelector)];
        const button = form.querySelector(config.submitButtonSelector);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
        })

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                checkInputValidity(input, restConfig);
                toggleButtonState(inputs, button, restConfig);
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