//createCard
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

//removeCard
export const removeCard = (item) => {
	item.remove();
};

//likeCard
export const likeCard = (evt) => {
		evt.target.classList.toggle('card__like-button_is-active');
}

