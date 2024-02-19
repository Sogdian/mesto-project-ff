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
import {addCard} from "./scripts/cards";

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

initialCards.forEach((item) => {
	addCard(item);
});


