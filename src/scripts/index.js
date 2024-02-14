const placesList = document.querySelector('.places__list');

function createCard(initialCard, removeCardCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardTitle = placesItem.querySelector('.card__title');
  const cardDeleteButton = placesItem.querySelector('.card__delete-button');

  placesItem.querySelector('.card__image').src = initialCard.link;
  placesItem.querySelector('.card__image').alt = initialCard.name;
  cardTitle.textContent = initialCard.name;

  function removeCard() {
    removeCardCallback(placesItem);
  }

  cardDeleteButton.addEventListener('click', removeCard);

  return placesItem;
}

const removeCard = (item) => {
  item.remove();
};

function addCard(item) {
  let placesItem = createCard(item, removeCard);
  placesList.append(placesItem);
}

initialCards.forEach((item) => {
  addCard(item);
});
