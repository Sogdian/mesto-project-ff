export const enableValidation = (validationConfig) => {
  const popupFormList = Array.from(
    document.querySelectorAll(validationConfig.formSelector),
  );
  popupFormList.forEach((popupFormElement) => {
    popupFormElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(
      popupFormElement,
      validationConfig.inputSelector,
      validationConfig.inputErrorClass,
      validationConfig.errorClass,
      validationConfig.submitButtonSelector,
      validationConfig.inactiveButtonClass,
    );
  });
};

function setEventListeners(
  popupFormElement,
  inputSelector,
  inputErrorClass,
  errorClass,
  submitButtonSelector,
  inactiveButtonClass,
) {
  const popupInputList = Array.from(popupFormElement.querySelectorAll(inputSelector));
  const buttonElement = popupFormElement.querySelector(submitButtonSelector);

  toggleButtonState(popupInputList, buttonElement, inactiveButtonClass);

  popupInputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(
        popupFormElement,
        inputElement,
        inputErrorClass,
        errorClass,
      );
      toggleButtonState(popupInputList, buttonElement, inactiveButtonClass);
    });
  });
}

const checkInputValidity = (
  popupFormElement,
  inputElement,
  inputErrorClass,
  errorClass,
) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      popupFormElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass,
    );
  } else {
    hideInputError(popupFormElement, inputElement, inputErrorClass, errorClass);
  }
};

export const toggleButtonState = (
  popupInputList,
  buttonElement,
  inactiveButtonClass,
) => {
  if (hasInvalidInput(popupInputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const hasInvalidInput = (popupFormList) => {
  return popupFormList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const showInputError = (
  popupFormElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass,
) => {
  const errorElement = popupFormElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (
  popupFormElement,
  inputElement,
  inputErrorClass,
  errorClass,
) => {
  const errorElement = popupFormElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
}

export function clearValidation(popupFormElement, validationConfig) {
  const popupInputList = Array.from(popupFormElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = popupFormElement.querySelector(
    validationConfig.submitButtonSelector,
  );

  popupInputList.forEach((inputElement) => {
    hideInputError(
      popupFormElement,
      inputElement,
      validationConfig.inputErrorClass,
      validationConfig.errorClass,
    );
  });

  buttonElement.classList.add(validationConfig.inactiveButtonClass);
  buttonElement.disabled = true;
}