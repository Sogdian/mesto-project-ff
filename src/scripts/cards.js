import { openTypeImageModal } from "./modal";
import {placesList} from "../index";


export function createCard(initialCard, removeCard, likeButton, openTypeImageModal) {
	const cardTemplate = document.querySelector('#card-template').content;
	const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
	const cardTitle = placesItem.querySelector('.card__title');
	const cardDeleteButton = placesItem.querySelector('.card__delete-button');
	const cardLikeButton = placesItem.querySelector('.card__like-button');
	const cardImage = cardTemplate.querySelector('.card__image');

	cardImage.src = initialCard.link;
	cardImage.alt = initialCard.name;
	cardTitle.textContent = initialCard.name;

	cardDeleteButton.addEventListener('click', removeCard);
	cardLikeButton.addEventListener('click', likeButton);
	cardImage.addEventListener('click', openTypeImageModal);

	return placesItem;
}

export const removeCard = (item) => {
	item.remove();
};

export const likeButton = (evt) => {
	if (evt.target.classList.contains('card__like-button')) {
		evt.target.classList.toggle('card__like-button_is-active');
	}
}

export function addCard(item) {
	let placesItem = createCard(item, removeCard, likeButton, openTypeImageModal);
	placesList.append(placesItem);
}