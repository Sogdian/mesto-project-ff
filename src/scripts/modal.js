import {popup, popupIsOpened, popupsClose} from "../index";

//openModal + addEventListener
export function openModal(element) {
	element.classList.add('popup_is-opened');

	document.addEventListener('keydown', closeModalWithEsc);

	element.addEventListener('click', closeModalOverlay);
}

//closeModal
export function closeModal(element) {
	element.classList.remove('popup_is-opened');
}

//closeModalOverlay
function closeModalOverlay(evt) {
		closeModal(evt.target);
}

//closeModalWithEsc
function closeModalWithEsc(evt) {
	if (evt.key === 'Escape') {
		const popupIsOpened = document.querySelector('.popup_is-opened');
		closeModal(popupIsOpened);
	}
}



