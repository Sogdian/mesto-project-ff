const placesList = document.querySelector('.places__list');

function addCard(initialCard, removeCardCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardDeleteButton = placesItem.querySelector('.card__delete-button');

  placesItem.querySelector('.card__image').src = initialCard.link;
  placesItem.querySelector('.card__image').alt = initialCard.name;

  function removeCard() {
    removeCardCallback(placesItem);
  }

  cardDeleteButton.addEventListener('click', removeCard);

  placesList.append(placesItem);
}

const removeCard = (item) => {
  item.remove();
};

initialCards.forEach((item) => {
  addCard(item, removeCard);
});
