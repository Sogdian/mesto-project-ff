export function openModal(element) {
	element.classList.add('popup_is-opened');

	document.addEventListener('keydown', closeModalWithEsc);

	element.addEventListener('click', closeModalOverlay);
}

export function closeModal(element) {
	element.classList.remove('popup_is-opened');
	document.removeEventListener('keydown', closeModalWithEsc);
}

function closeModalOverlay(evt) {
	if(evt.target.classList.contains('popup_is-opened')) {
		closeModal(evt.target);
		evt.target.removeEventListener('click', closeModalOverlay);
	}
}

function closeModalWithEsc(evt) {
	if (evt.key === 'Escape') {
		const popupIsOpened = document.querySelector('.popup_is-opened');
		closeModal(popupIsOpened);
	}
}



