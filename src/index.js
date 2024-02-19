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
import {addCard, createCard, likeCard, removeCard} from "./scripts/cards";
import {openTypeImageModal} from "./scripts/modal";

export const placesList = document.querySelector('.places__list');
// export const popupTypeImage = document.querySelector('.popup_type_image');
export const popupImage = document.querySelector('.popup__image');
export const popup = document.querySelector('.popup');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
// export const popupTypeEdit = document.querySelector('.popup_type_edit');
// export const popupTypeNewCard = document.querySelector('.popup_type_new-card');
export const popupsClose = document.querySelectorAll('.popup__close');
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
export const popupIsOpened = document.querySelector('.popup_is-opened');
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

// function handleTypeNewCardFormSubmit(evt) {
// 	const card = {
// 		name: placeName.value,
// 		link: link.value
// 	}
// 	addDataForNewCard(evt, card);
// }
//
// function addDataForNewCard(evt, card) {
// 	evt.preventDefault()
// 	let placesItem = createCard(card, removeCard, likeCard, openTypeImageModal);
// 	placesList.prepend(placesItem);
// 	document.forms.namedItem('new-place').reset();
// 	closeModal();
// }

document.forms.namedItem('new-place').addEventListener('submit', handleTypeNewCardFormSubmit);

