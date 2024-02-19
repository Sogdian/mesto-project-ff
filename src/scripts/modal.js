export function openModal(element) {
	element.classList.add('popup_is-opened');

	document.addEventListener('keydown', closeModalWithEsc);

	element.addEventListener('click', closeModalOverlay);
}

export function closeModal(element) {
	element.classList.remove('popup_is-opened');
}

function closeModalOverlay(evt) {
		closeModal(evt.target);
}

function closeModalWithEsc(evt) {
	if (evt.key === 'Escape') {
		const popupIsOpened = document.querySelector('.popup_is-opened');
		closeModal(popupIsOpened);
		document.removeEventListener('keydown', closeModalWithEsc);
	}
}



