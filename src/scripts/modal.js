const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const profileAddButton = document.querySelector('.profile__add-button');
const popupClose = document.querySelectorAll('.popup__close');
const cardImage = document.querySelector('.card__image');
const placesList = document.querySelector('.places__list');
const placesItem = document.querySelectorAll('.places__item');
const popupImage = document.querySelector('.popup__image');

const closeModal = () => {
	popupTypeEdit.style.display = 'none'
	popupTypeNewCard.style.display = 'none'
	popupTypeImage.style.display = 'none'
}

popupClose.forEach((evt) => {
	evt.addEventListener('click', closeModal)
})

popupTypeImage.addEventListener('click', closeModal);

const openModal1 = () => {
	popupTypeEdit.style.display = 'flex'
}

profileEditButton.addEventListener('click', openModal1)

const openModal2 = () => {
	popupTypeNewCard.style.display = 'flex'
}

profileAddButton.addEventListener('click', openModal2)

const openModal3 = (evt) => {
	console.log("!")
	popupTypeImage.style.display = 'flex';
	const eventTarget = evt.target;
	popupImage.src = eventTarget.src;
};

placesList.addEventListener('click', openModal3);

// placesList.addEventListener('click', function (evt) {
// 	if (evt.target.classList.contains('card__like-button')) {
// 		evt.target.classList.toggle('button');
// 	}
// });

const closeModalForESC = (evt) => {
	if(evt.key === 'Escape') {
		closeModal();
	}
	document.removeEventListener('keydown', closeModal);
}

document.addEventListener('keydown', closeModalForESC);

