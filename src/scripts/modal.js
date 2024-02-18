import {createCard} from "./index";
import {removeCard} from "./index";

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const placesList = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup__image');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupClose = document.querySelectorAll('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfile = document.querySelector('.edit-profile');

function openTypeEditModal() {
	popupTypeEdit.style.display = 'flex'

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
	popupTypeNewCard.style.display = 'flex';
}

function handleTypeNewCardFormSubmit(evt) {
	const placeName = document.forms.namedItem('new-place').elements.namedItem('place-name');
	const link = document.forms.namedItem('new-place').elements.namedItem('link');

	const card = {
		name: placeName.value,
		link: link.value
	}
	addDataForNewCard(evt, card);
}

document.forms.namedItem('new-place').addEventListener('submit', handleTypeNewCardFormSubmit);
profileAddButton.addEventListener('click', openTypeNewCardModal);


function addDataForNewCard(evt, card) {
	evt.preventDefault()
	let placesItem = createCard(card, removeCard);
	placesList.prepend(placesItem);
	document.forms.namedItem('new-place').reset();
	closeModal();
}

function openTypeImageModal(evt) {
	if (evt.target.classList.contains('card__image')) {
		popupTypeImage.style.display = 'flex';
		const eventTarget = evt.target;
		popupImage.src = eventTarget.src;
	}
};

placesList.addEventListener('click', openTypeImageModal);

// placesList.addEventListener('click', function (evt) {
// 	if (evt.target.classList.contains('card__like-button')) {
// 		evt.target.classList.toggle('button');
// 	}
// });

function closeModal() {
	popupTypeEdit.style.display = 'none'
	popupTypeNewCard.style.display = 'none'
	popupTypeImage.style.display = 'none'
}

popupClose.forEach((evt) => {
	evt.addEventListener('click', closeModal)
})

function closeModalWithEsc (evt) {
	if(evt.key === 'Escape') {
		closeModal();
	}
	document.removeEventListener('keydown', closeModal);
}

document.addEventListener('keydown', closeModalWithEsc);



