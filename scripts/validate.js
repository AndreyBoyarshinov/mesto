const isValid = (formElement, inputElement, selectorNames) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, selectorNames);
    } else {
        hideInputError(formElement, inputElement, selectorNames);
    }
};

const showInputError = (formElement, inputElement, errorMessage, selectorNames) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(selectorNames.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectorNames.errorClass);
};

const hideInputError = (formElement, inputElement, selectorNames) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(selectorNames.inputErrorClass);
    errorElement.classList.remove(selectorNames.errorClass);
    errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
        return !input.validity.valid;
    });
}

const toggleButtonState = (inputList, buttonElement, selectorNames) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(selectorNames.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(selectorNames.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
}

const setEventListeners = (formElement, selectorNames) => {
    const inputList = Array.from(formElement.querySelectorAll(selectorNames.inputSelector));
    const buttonElement = formElement.querySelector(selectorNames.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, selectorNames);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, selectorNames);
            toggleButtonState(inputList, buttonElement, selectorNames);
        });
    });
};

const enableValidation = (selectorNames) => {
    const formList = Array.from(document.querySelectorAll(selectorNames.formSelector));

    formList.forEach((formElement) => {
        setEventListeners(formElement, selectorNames);
    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field-error_active'
});