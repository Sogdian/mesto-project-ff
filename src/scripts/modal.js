const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const placesList = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup__image');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupClose = document.querySelectorAll('.popup__close');

const openTypeEditModal = () => {
	popupTypeEdit.style.display = 'flex'
}

profileEditButton.addEventListener('click', openTypeEditModal)

const openTypeNewCardModal = () => {
	popupTypeNewCard.style.display = 'flex'
}

profileAddButton.addEventListener('click', openTypeNewCardModal)

const openTypeImageModal = (evt) => {
	popupTypeImage.style.display = 'flex';
	const eventTarget = evt.target;
	popupImage.src = eventTarget.src;
};

placesList.addEventListener('click', openTypeImageModal);

// placesList.addEventListener('click', function (evt) {
// 	if (evt.target.classList.contains('card__like-button')) {
// 		evt.target.classList.toggle('button');
// 	}
// });


function closeModal () {
	popupTypeEdit.style.display = 'none'
	popupTypeNewCard.style.display = 'none'
	popupTypeImage.style.display = 'none'
}

popupClose.forEach((evt) => {
	evt.addEventListener('click', closeModal)
})

function closeModalForESC (evt) {
	if(evt.key === 'Escape') {
		closeModal();
	}
	document.removeEventListener('keydown', closeModal);
}

document.addEventListener('keydown', closeModalForESC);



