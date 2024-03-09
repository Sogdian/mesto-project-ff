import './pages/index.css';
import {createCard, likeCard, removeCard} from "./scripts/card";
import {closeModal, openModal} from "./scripts/modal";
import {initialCards} from "./scripts/cards";
import {enableValidation} from "./scripts/validation";

const placesList = document.querySelector('.places__list');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupsClose = document.querySelectorAll('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const profileDescription = document.querySelector('.profile__description');
const editProfile = document.forms.namedItem('edit-profile');
const nameInput = editProfile.elements.name;
const descriptionInput = editProfile.elements.description;
const newPlace = document.forms.namedItem('new-place');
const placeNameInput = newPlace.elements.namedItem('place-name');
const linkInput = newPlace.elements.link;

export function addCard(item, placesList, addType = 'append') {
	const placesItem = createCard(item, removeCard, likeCard, openTypeImageModal);
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
});

editProfile.addEventListener('submit', handleTypeEditFormSubmit);

function handleTypeEditFormSubmit(evt) {
	evt.preventDefault()
	profileTitle.textContent = nameInput.value;
	profileDescription.textContent = descriptionInput.value;
	closeModal(popupTypeEdit);
}

profileAddButton.addEventListener('click', function () {
	openModal(popupTypeNewCard);
})

newPlace.addEventListener('submit', handleTypeNewCardFormSubmit);

function handleTypeNewCardFormSubmit(evt) {
	evt.preventDefault();
	const card = {
		name: placeNameInput.value,
		link: linkInput.value
	}
	addCard(card, placesList, 'prepend');
	closeModal(popupTypeNewCard);
	newPlace.reset();
}

function openTypeImageModal(evt) {
	popupImage.src = evt.target.src;
	popupImage.alt = evt.target.alt;
	popupCaption.textContent = evt.target.alt;
	openModal(popupTypeImage);
}

popupsClose.forEach((item) => {
	item.addEventListener('click', function (evt) {
		closeModal(evt.target.closest('.popup'))
	})
})

enableValidation();