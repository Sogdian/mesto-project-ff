import { popupIsOpened,	popupsClose } from "../index";

//openModal + addEventListener
export function openModal(element) {
	element.classList.add('popup_is-opened');

	document.addEventListener('keydown', closeModalWithEsc);

	popupsClose.forEach((evt) => {
		evt.addEventListener('click', closeModal)
	})

	element.addEventListener('click', closeModalOverlay);
}

//closeModal
export function closeModal(element) {
	element.classList.remove('popup_is-opened');
	// document.removeEventListener('keydown', closeModalWithEsc);
}

//closeModalOverlay
function closeModalOverlay(evt) {
		closeModal(evt.target);
}

//closeModalWithEsc
function closeModalWithEsc(evt) {
	if (evt.key === 'Escape') {
		closeModal(popupIsOpened);
	}
}



