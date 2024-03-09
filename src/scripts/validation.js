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

export const enableValidation = () => {
	const popupFormList = Array.from(document.querySelectorAll('.popup__form'));

	// const buttonElement = popupFormList.querySelector('.popup__button');

	popupFormList.forEach((popupFormElement) => {
		popupFormElement.addEventListener('submit', function (evt) {
			evt.preventDefault();
		});

		const popupInputList = Array.from(popupFormElement.querySelectorAll('.popup__input'));
		popupInputList.forEach((inputElement) => {
			inputElement.addEventListener('input', function () {
				checkInputValidity(popupFormList, inputElement);
				// toggleButtonState(inputList, buttonElement);
			});
		});
	});


};