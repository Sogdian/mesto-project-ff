import './pages/index.css';
import {createCard, likeCard} from "./scripts/card";
import {closeModal, openModal} from "./scripts/modal";
import {clearValidation, enableValidation } from "./scripts/validation";
import {deleteCards, getCards, getUser, postCards} from "./scripts/api";

const placesList = document.querySelector('.places__list');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeDelete = document.querySelector('.popup_type_delete');
const popupsClose = document.querySelectorAll('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileImage = document.querySelector('.profile__image');
const profileDescription = document.querySelector('.profile__description');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const editProfile = document.forms.namedItem('edit-profile');
const deleteCardForm = document.forms.namedItem('delete-card');
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

const promises = [getUser(), getCards()]
let id = null; //_id: "7b27e879e4b84b028539e834"

Promise.all(promises)
	.then(([user, cards]) => {
		profileTitle.textContent = user.name;
		profileDescription.textContent = user.about;
		profileImage.url = user.avatar;
		id = user['_id']

		cards.forEach((initialCard) => {
			addCard(initialCard, placesList, id);
		});
	})
	.catch(console.error);

export function addCard(initialCard, placesList, id, addType = 'append', ) {
	const placesItem = createCard(initialCard, openTypeDeleteCard, likeCard, openTypeImageModal, id);

	if (addType === 'append') {
		placesList.append(placesItem);
	} else {
		placesList.prepend(placesItem);
	}
}

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

async function handleTypeNewCardFormSubmit(evt) {
	evt.preventDefault();
	const card = {
		name: placeNameInput.value,
		link: linkInput.value,
	}

	await postCards(card);

	closeModal(popupTypeNewCard);
	newPlace.reset();
}

let cardForDeleteId = null;
let cardForDelete = null;

const openTypeDeleteCard = (initialCardId, placesItem) => {
	cardForDeleteId = initialCardId;
	cardForDelete = placesItem
	openModal(popupTypeDelete);
};

deleteCardForm.addEventListener('submit', handleDeleteCard);

async function handleDeleteCard(evt) {
	evt.preventDefault();
	const cardId = cardForDeleteId;
	const card = cardForDelete;

	deleteCards(cardId)
		.then(() => {
			console.log('114')
			card.remove();
			console.log('116')
			closeModal(popupTypeDelete);
			console.log('118')
		})
		.catch(() => {
			console.log('Ошибка. Запрос не выполнен');
		})
		.finally(() => {
			cardForDeleteId = null;
		});
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