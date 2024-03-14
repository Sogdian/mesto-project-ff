import './pages/index.css';
import {createCard, likeCard} from "./scripts/card";
import {closeModal, openModal} from "./scripts/modal";
import {clearValidation, enableValidation } from "./scripts/validation";
import {deleteCards, getCards, getUser, postCards, upgradeAvatar, upgradeUser} from "./scripts/api";

const placesList = document.querySelector('.places__list');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const profileImageButton = document.querySelector('.profile__image-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeDelete = document.querySelector('.popup_type_delete');
const popupsClose = document.querySelectorAll('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const profileImage = document.querySelector('.profile__image');
const profileDescription = document.querySelector('.profile__description');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const editProfile = document.forms.namedItem('edit-profile');
const deleteCardForm = document.forms.namedItem('delete-card');
const editAvatar = document.forms.namedItem('edit-avatar');
const nameLink = editAvatar.elements.link;
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
let id = null;

Promise.all(promises)
	.then(([user, cards]) => {
		profileTitle.textContent = user.name;
		profileDescription.textContent = user.about;
		profileImage.style.backgroundImage = `url(${user.avatar})`;
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

profileImageButton.addEventListener('click', handleImageButton)

async function handleImageButton(evt) {
	openModal(popupTypeAvatar);
}

editAvatar.addEventListener('submit', handleEditAvatar);

async function handleEditAvatar(evt) {
	const popupButton = evt.target.querySelector('.popup__button');
	popupButton.textContent = 'Сохранение...';

	const user = {
		avatar: nameLink.value,
	}
	await upgradeAvatar(user)
		.then((res) => {
			profileImage.style.backgroundImage = `url(${res.avatar})`;
		});

	closeModal(popupTypeAvatar);
	editAvatar.reset();
	popupButton.textContent = 'Сохранение';
}

profileEditButton.addEventListener('click', function () {
	nameInput.value = profileTitle.textContent;
	descriptionInput.value = profileDescription.textContent;

	clearValidation(editProfile, validationConfig);
	openModal(popupTypeEdit);
});

editProfile.addEventListener('submit', handleTypeEditFormSubmit);

async function handleTypeEditFormSubmit(evt) {
	evt.preventDefault()
	const popupButton = evt.target.querySelector('.popup__button');
	popupButton.textContent = 'Сохранение...';

	const user = {
		name: nameInput.value,
		about: descriptionInput.value
	}

	await upgradeUser(user)
		.then((res) => {
			profileTitle.textContent = res.name;
			profileDescription.textContent = res.about;
		});

	closeModal(popupTypeEdit);
	popupButton.textContent = 'Сохранение';
}

profileAddButton.addEventListener('click', function () {
	clearValidation(newPlace, validationConfig);
	openModal(popupTypeNewCard);
})

newPlace.addEventListener('submit', handleTypeNewCardFormSubmit);

async function handleTypeNewCardFormSubmit(evt) {
	evt.preventDefault();
	const popupButton = evt.target.querySelector('.popup__button');
	popupButton.textContent = 'Сохранение...';

	const card = {
		name: placeNameInput.value,
		link: linkInput.value,
	}

	await postCards(card);

	closeModal(popupTypeNewCard);
	newPlace.reset();
	popupButton.textContent = 'Сохранение';
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
			card.remove();
			closeModal(popupTypeDelete);
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