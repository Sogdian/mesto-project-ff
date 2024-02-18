import {createCard, likeButton, openTypeImageModal} from "./index";
import {removeCard} from "./index";

const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const placesList = document.querySelector('.places__list');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupsClose = document.querySelectorAll('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function openTypeEditModal() {
	// popupTypeEdit.style.display = 'flex'
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
	popupTypeNewCard.style.display = 'flex'
	// popupTypeNewCard.style.opacity = '1'

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
	popupTypeEdit.style.opacity = '0'
	popupTypeEdit.style.transition = 'opacity 0.5s linear'


	popupTypeNewCard.style.display = 'none'
	popupTypeImage.style.display = 'none'
}

popupsClose.forEach((evt) => {
	evt.addEventListener('click', closeModal)
})

function closeModalWithEsc (evt) {
	if(evt.key === 'Escape') {
		closeModal();
	}
	document.removeEventListener('keydown', closeModal);
}

document.addEventListener('keydown', closeModalWithEsc);



