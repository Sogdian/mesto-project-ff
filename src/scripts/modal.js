import {
	placesList,
	popup,
	popupImage, popupIsOpened,
	popupsClose,
	profileAddButton,
	profileDescription,
	profileEditButton,
	profileTitle
} from "../index";
import {createCard, likeCard, removeCard} from "./cards";

function openModal(element) {
	element.classList.add('popup_is-opened');

	document.addEventListener('keydown', closeModalWithEsc);

	popupsClose.forEach((evt) => {
		evt.addEventListener('click', closeModal)
	})
}

// export function openTypeEditModal() {
// 	popup.style.visibility = 'visible'
// 	popup.style.opacity = '1'
// 	popup.style.transition = 'opacity 0.5s linear'
//
// 	const name = document.forms.namedItem('edit-profile').elements.name;
// 	name.value = profileTitle.textContent;
// 	const description = document.forms.namedItem('edit-profile').elements.description;
// 	description.value = profileDescription.textContent;
//
// 	function handleTypeEditFormSubmit(evt) {
// 		saveNewTypeEditData(evt, name.value, description.value);
// 	}
//
// 	document.forms.namedItem('edit-profile').addEventListener('submit', handleTypeEditFormSubmit);
// }
//
// profileEditButton.addEventListener('click', openTypeEditModal)
//
// function saveNewTypeEditData(evt, name, description) {
// 	evt.preventDefault()
// 	profileTitle.textContent = name;
// 	profileDescription.textContent = description;
// 	closeModal();
// }
//
// function openTypeNewCardModal() {
// 	popup.style.visibility = 'visible'
// 	popup.style.opacity = '1'
// 	popup.style.transition = 'opacity 0.5s linear'
//
// 	const placeName = document.forms.namedItem('new-place').elements.namedItem('place-name');
// 	const link = document.forms.namedItem('new-place').elements.namedItem('link');
// }
//
// profileAddButton.addEventListener('click', openTypeNewCardModal)
//
// export const openTypeImageModal = (evt) => {
// 	if (evt.target.classList.contains('card__image')) {
// 		popupTypeImage.style.visibility = 'visible'
// 		popupTypeImage.style.opacity = '1'
// 		popupTypeImage.style.transition = 'opacity 0.5s linear'
// 		const eventTarget = evt.target;
// 		popupImage.src = eventTarget.src;
// 	}
// }


function closeModal(element) {
	element.classList.remove('popup_is-opened');
	// document.removeEventListener('keydown', closeModalWithEsc);
}



function closeModalWithEsc(evt) {
	if (evt.key === 'Escape') {
		closeModal(popupIsOpened);
	}
	document.removeEventListener('keydown', closeModal);
}



