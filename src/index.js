import './pages/index.css';
import './scripts/modal.js';
import './scripts/cards.js';
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
import { createCard, likeCard, removeCard } from "./scripts/cards";
import { closeModal, openModal } from "./scripts/modal";
export const placesList = document.querySelector('.places__list');
export const popupTypeImage = document.querySelector('.popup_type_image');
export const popupImage = document.querySelector('.popup__image');
export const popup = document.querySelector('.popup');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
export const popupTypeEdit = document.querySelector('.popup_type_edit');
export const popupTypeNewCard = document.querySelector('.popup_type_new-card');
export const popupsClose = document.querySelectorAll('.popup__close');
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
export const popupIsOpened = document.querySelector('.popup_is-opened');
export const popupForm = document.querySelector('.popup__form');
export const editProfile = document.forms.namedItem('edit-profile');
export const nameInput = editProfile.elements.name;
export const descriptionInput = editProfile.elements.description;
export const newPlace = document.forms.namedItem('new-place');
export const placeNameInput = newPlace.elements.namedItem('place-name');
export const linkInput = newPlace.elements.link;
export const initialCards = [
	{
		name: "Архыз",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
	},
	{
		name: "Челябинская область",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
	},
	{
		name: "Иваново",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
	},
	{
		name: "Камчатка",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
	},
	{
		name: "Холмогорский район",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
	},
	{
		name: "Байкал",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
	}
];

//addCard
export function addCard(item, placesList, addType = 'append') {
	let placesItem = createCard(item, removeCard, likeCard, openTypeImageModal);
	if (addType === 'append') {
		placesList.append(placesItem);
	} else {
		placesList.prepend(placesItem);
	}
}
//forEach addCard
initialCards.forEach((item) => {
	addCard(item, placesList);
});

//profileEditButton click + submit
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

//profileAddButton click + submit
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
		const eventTarget = evt.target;
		popupImage.src = eventTarget.src;
	}
}

//profileAddButton click + submit
popupTypeImage.addEventListener('click', openTypeImageModal)

//popupsClose
popupsClose.forEach((evt) => {
	evt.addEventListener('click', function (evt) {
			closeModal(evt.target.closest('.popup'))
	})
})

