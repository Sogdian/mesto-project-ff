import './pages/index.css';
import {createCard, likeCard, removeCard} from "./scripts/card";
import {closeModal, openModal} from "./scripts/modal";
import {clearValidation, enableValidation } from "./scripts/validation";
import {getCards, getUser} from "./scripts/api";

const placesList = document.querySelector('.places__list');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupsClose = document.querySelectorAll('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileImage = document.querySelector('.profile__image');
const profileDescription = document.querySelector('.profile__description');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const editProfile = document.forms.namedItem('edit-profile');
const nameInput = editProfile.elements.name;
const descriptionInput = editProfile.elements.description;
const newPlace = document.forms.namedItem('new-place');
const placeNameInput = newPlace.elements.namedItem('place-name');
const linkInput = newPlace.elements.link;
const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'button_inactive',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__input-error_active'
};

await useUserData();

async function useUserData() {
	let users = await getUser();
	profileTitle.textContent = users.name;
	profileDescription.textContent = users.about;
	profileImage.url = users.avatar;
}

export function addCard(item, placesList, addType = 'append') {
	const placesItem = createCard(item, removeCard, likeCard, openTypeImageModal);
	if (addType === 'append') {
		placesList.append(placesItem);
	} else {
		placesList.prepend(placesItem);
	}
}

let cardList = await getCards();
cardList.forEach((item) => {
	addCard(item, placesList);
});

profileEditButton.addEventListener('click', function () {
	nameInput.value = profileTitle.textContent;
	descriptionInput.value = profileDescription.textContent;

	clearValidation(editProfile, validationConfig);
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
	clearValidation(newPlace, validationConfig);
	openModal(popupTypeNewCard);
})

newPlace.addEventListener('submit', handleTypeNewCardFormSubmit);

function handleTypeNewCardFormSubmit(evt, validationConfig) {
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

enableValidation(validationConfig);