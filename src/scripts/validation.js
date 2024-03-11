const showInputError = (formElement, inputElement, errorMessage) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add('popup__input_type_error');
	errorElement.textContent = errorMessage;
	errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove('popup__input_type_error');
	errorElement.classList.remove('popup__input-error_active');
	errorElement.textContent = '';
};

const checkInputValidity = (popupFormList, inputElement) => {
	if (inputElement.validity.patternMismatch) {
		inputElement.setCustomValidity(inputElement.dataset.errorMessage);
	} else {
		inputElement.setCustomValidity("");
	}
	if (!inputElement.validity.valid) {
		showInputError(popupFormList, inputElement, inputElement.validationMessage);
	} else {
		hideInputError(popupFormList, inputElement);
	}
};

const hasInvalidInput = (popupFormList) => {
	return popupFormList.some((inputElement) => {
		return !inputElement.validity.valid;
	})
};

// export function clearValidation(popupFormList, validationConfig){
// 	hideInputError(popupFormList, inputElement);
//
// 	buttonElement.disabled = false;
// 	buttonElement.classList.remove('button_inactive');
// }

const toggleButtonState = (popupInputList, buttonElement) => {
	if (hasInvalidInput(popupInputList)) {
		buttonElement.disabled = true;
		buttonElement.classList.add('button_inactive');
	} else {
		buttonElement.disabled = false;
		buttonElement.classList.remove('button_inactive');
	}
};

export const enableValidation = (validationConfig) => {
	const popupFormList = Array.from(document.querySelectorAll(validationConfig.formSelector));
	popupFormList.forEach((popupFormElement) => {
		popupFormElement.addEventListener('submit', function (evt) {
			evt.preventDefault();
		});

		const popupInputList = Array.from(popupFormElement.querySelectorAll(validationConfig.inputSelector));
		const buttonElement = popupFormElement.querySelector(validationConfig.submitButtonSelector);
		toggleButtonState(popupInputList, buttonElement);

		popupInputList.forEach((inputElement) => {
			inputElement.addEventListener('input', function () {
				checkInputValidity(popupFormElement, inputElement);
				toggleButtonState(popupInputList, buttonElement);
			});
		});
	});
};