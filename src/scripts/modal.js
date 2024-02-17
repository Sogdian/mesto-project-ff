const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const profileAddButton = document.querySelector('.profile__add-button');
const popupClose = document.querySelectorAll('.popup__close');
const cardImage = document.querySelectorAll('.card__image');
const popupImage = document.querySelector('.popup__image');

const closeModal = () => {
	popupTypeEdit.style.display = 'none'
	popupTypeNewCard.style.display = 'none'
	popupTypeImage.style.display = 'none'
}

popupClose.forEach((evt) => {
	evt.addEventListener('click', closeModal)
})

const openModal1 = () => {
	popupTypeEdit.style.display = 'flex'
}

profileEditButton.addEventListener('click', openModal1)

const openModal2 = () => {
	popupTypeNewCard.style.display = 'flex'
}

profileAddButton.addEventListener('click', openModal2)

const openModal3 = (evt) => {
	popupTypeImage.style.display = 'flex';
	const eventTarget = evt.target;
	popupImage.src = eventTarget.src;
};

cardImage.forEach((evt) => { //Делегирование
	evt.addEventListener('click', openModal3);
});


