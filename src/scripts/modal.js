const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const profileAddButton = document.querySelector('.profile__add-button');
const popupClose = document.querySelectorAll('.popup__close');


const openModal1 = () => {
	popupTypeEdit.style.display = 'flex'
}

const closeModal1 = () => {
	popupTypeEdit.style.display = 'none'
	popupTypeNewCard.style.display = 'none'
	popupTypeImage.style.display = 'none'
}

profileEditButton.addEventListener('click', openModal1)


popupClose.forEach((evt) => {
	evt.addEventListener('click', closeModal1)
})


const openModal2 = () => {
	popupTypeNewCard.style.display = 'flex'
}

profileAddButton.addEventListener('click', openModal2)

const openModal3 = () => {
	popupTypeImage.style.display = 'flex'
}

popupTypeImage.addEventListener('click', openModal3)


