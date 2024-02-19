import './pages/index.css';
import './scripts/modal.js';
import './scripts/card.js';
import './images/add-icon.svg';
import './images/avatar.jpg';
import './images/card_1.jpg';
import './images/card_2.jpg';
import './images/card_3.jpg';
import './images/close.svg';
import './images/delete-icon.svg';
import './images/edit-icon.svg';
import './images/like-active.svg';
import './images/like-inactive.svg';
import './images/logo.svg';
import { createCard, likeCard, removeCard } from "./scripts/card";
import { closeModal, openModal } from "./scripts/modal";
import { initialCards } from "./scripts/cards";

const placesList = document.querySelector('.places__list');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupsClose = document.querySelectorAll('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfile = document.forms.namedItem('edit-profile');
const nameInput = editProfile.elements.name;
const descriptionInput = editProfile.elements.description;
const newPlace = document.forms.namedItem('new-place');
const placeNameInput = newPlace.elements.namedItem('place-name');
const linkInput = newPlace.elements.link;

export function addCard(item, placesList, addType = 'append') {
	let placesItem = createCard(item, removeCard, likeCard, openTypeImageModal);
	if (addType === 'append') {
		placesList.append(placesItem);
	} else {
		placesList.prepend(placesItem);
	}
}

initialCards.forEach((item) => {
	addCard(item, placesList);
});

profileEditButton.addEventListener('click', function () {
	nameInput.value = profileTitle.textContent;
	descriptionInput.value = profileDescription.textContent;

	openModal(popupTypeEdit);

	function handleTypeEditFormSubmit(evt) {
		saveNewTypeEditData(evt, nameInput.value, descriptionInput.value, popupTypeEdit);
	}

	editProfile.addEventListener('submit', handleTypeEditFormSubmit);
});

function saveNewTypeEditData(evt, name, description, popupTypeEdit) {
	evt.preventDefault()
	profileTitle.textContent = name;
	profileDescription.textContent = description;
	closeModal(popupTypeEdit);
}

profileAddButton.addEventListener('click', function () {
	openModal(popupTypeNewCard);

	const placeName = placeNameInput;
	const link = linkInput;

	function handleTypeNewCardFormSubmit(evt) {
		const card = {
			name: placeName.value,
			link: link.value
		}
		addDataForNewCard(evt, card);
	}

	newPlace.addEventListener('submit', handleTypeNewCardFormSubmit);
})

function addDataForNewCard(evt, card) {
	evt.preventDefault()
	addCard(card, placesList, 'prepend');
	closeModal(popupTypeNewCard);
	newPlace.reset();
}

export const openTypeImageModal = (evt) => {
	if (evt.target.classList.contains('card__image')) {
		popupImage.src = evt.target.src;
		openModal(popupTypeImage);
	}
}

placesList.addEventListener('click', openTypeImageModal)

popupsClose.forEach((evt) => {
	evt.addEventListener('click', function (evt) {
		closeModal(evt.target.closest('.popup'))
	})
})

