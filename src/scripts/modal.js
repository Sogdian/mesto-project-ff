import {
	placesList,
	popup,
	popupImage,
	popupsClose,
	profileAddButton,
	profileDescription,
	profileEditButton,
	profileTitle
} from "../index";
import {createCard, likeButton, removeCard} from "./cards";


function openTypeEditModal() {
	popup.style.visibility = 'visible'
	popup.style.opacity = '1'
	popup.style.transition = 'opacity 0.5s linear'

	const name = document.forms.namedItem('edit-profile').elements.name;
	name.value = profileTitle.textContent;
	const description = document.forms.namedItem('edit-profile').elements.description;
	description.value = profileDescription.textContent;

	function handleTypeEditFormSubmit(evt) {
		saveNewTypeEditData(evt, name.value, description.value);
	}

	document.forms.namedItem('edit-profile').addEventListener('submit', handleTypeEditFormSubmit);
}

profileEditButton.addEventListener('click', openTypeEditModal)

function saveNewTypeEditData(evt, name, description) {
	evt.preventDefault()
	profileTitle.textContent = name;
	profileDescription.textContent = description;
	closeModal();
}

function openTypeNewCardModal() {
	popup.style.visibility = 'visible'
	popup.style.opacity = '1'
	popup.style.transition = 'opacity 0.5s linear'

	const placeName = document.forms.namedItem('new-place').elements.namedItem('place-name');
	const link = document.forms.namedItem('new-place').elements.namedItem('link');

	function handleTypeNewCardFormSubmit(evt) {
		const card = {
			name: placeName.value,
			link: link.value
		}
		addDataForNewCard(evt, card);
		document.forms.namedItem('new-place').removeEventListener('submit', handleTypeNewCardFormSubmit);
	}

	document.forms.namedItem('new-place').addEventListener('submit', handleTypeNewCardFormSubmit);
}

export const openTypeImageModal = (evt) => {
	if (evt.target.classList.contains('card__image')) {
		popupTypeImage.style.visibility = 'visible'
		popupTypeImage.style.opacity = '1'
		popupTypeImage.style.transition = 'opacity 0.5s linear'
		const eventTarget = evt.target;
		popupImage.src = eventTarget.src;
	}
}

profileAddButton.addEventListener('click', openTypeNewCardModal)

function addDataForNewCard(evt, card) {
	evt.preventDefault()
	let placesItem = createCard(card, removeCard, likeButton, openTypeImageModal);
	placesList.prepend(placesItem);
	document.forms.namedItem('new-place').reset();
	closeModal();
}

function closeModal() {
	// popupTypeEdit.style.display = 'none'
	popupTypeEdit.style.visibility = 'hidden'
	popupTypeEdit.style.transition = 'opacity 0.5s linear'
	popupTypeEdit.style.opacity = '0'

	// popupTypeNewCard.style.display = 'none'
	popupTypeNewCard.style.visibility = 'hidden'
	popupTypeNewCard.style.transition = 'opacity 0.5s linear'
	popupTypeNewCard.style.opacity = '0'

	// popupTypeImage.style.display = 'none'
	popupTypeImage.style.visibility = 'hidden'
	popupTypeImage.style.transition = 'opacity 0.5s linear'
	popupTypeImage.style.opacity = '0'
}

popupsClose.forEach((evt) => {
	evt.addEventListener('click', closeModal)
})

function closeModalWithEsc(evt) {
	if (evt.key === 'Escape') {
		closeModal();
	}
	document.removeEventListener('keydown', closeModal);
}

document.addEventListener('keydown', closeModalWithEsc);



