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

const checkInputValidity = (formList, inputElement) => {
	if (inputElement.validity.patternMismatch) {
		inputElement.setCustomValidity(inputElement.dataset.errorMessage);
	} else {
		inputElement.setCustomValidity("");
	}
	if (!inputElement.validity.valid) {
		showInputError(formList, inputElement, inputElement.validationMessage);
	} else {
		hideInputError(formList, inputElement);
	}
};

export const enableValidation = () => {
	const formList = Array.from(document.querySelectorAll('.popup__form'));
	const inputList = Array.from(formList.querySelectorAll('.popup__input'));
	const buttonElement = formList.querySelector('.popup__button');

	formList.forEach((formElement) => {
		formElement.addEventListener('submit', function (evt) {
			evt.preventDefault();
		});
	});

	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', function () {
			checkInputValidity(formList, inputElement);
			// toggleButtonState(inputList, buttonElement);
		});
	});
};