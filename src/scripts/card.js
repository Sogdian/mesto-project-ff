import {openModal} from "./modal";

const popupTypeDelete = document.querySelector('.popup_type_delete');

export function createCard(initialCard, openTypeDeleteCard, likeButton, openTypeImageModal, id) {
	const cardTemplate = document.querySelector('#card-template').content;
	const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
	const cardTitle = placesItem.querySelector('.card__title');
	const cardDeleteButton = placesItem.querySelector('.card__delete-button');
	const cardLikeButton = placesItem.querySelector('.card__like-button');
	const cardImage = placesItem.querySelector('.card__image');
	const cardLike = placesItem.querySelector('.card__like');

	cardImage.src = initialCard.link;
	cardImage.alt = initialCard.name;
	cardTitle.textContent = initialCard.name;
	cardLike.textContent = initialCard.likes.length;

	if (initialCard.owner['_id'] != id) {
		cardDeleteButton.style.display = 'none';
	} else {
		cardDeleteButton.style.display = 'block';
	}

	cardDeleteButton.addEventListener('click', () => {
		// openTypeDeleteCard(placesItem)
		openTypeDeleteCard(initialCard['_id'], placesItem)
	});
	cardLikeButton.addEventListener('click', likeButton);
	cardImage.addEventListener('click', openTypeImageModal);

	return placesItem;
}



export const likeCard = (evt) => {
	evt.target.classList.toggle('card__like-button_is-active');
}

