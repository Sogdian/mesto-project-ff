const placesList = document.querySelector('.places__list');
const listItems = document.querySelectorAll('.places__item');

function addCards(initialCards, removeCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardDeleteButton = placesItem.querySelector('.card__delete-button');

  placesItem.querySelector('.card__image').src = initialCards.link;
  placesItem.querySelector('.card__image').alt = initialCards.name;

  // cardDeleteButton.addEventListener('click', removeCard);

  cardDeleteButton.addEventListener('click', function(){
    placesItem.remove();
  });

  placesList.append(placesItem);
}

function removeCard() {
  // listItems.remove();
}

initialCards.forEach((item) => {
  addCards(item, removeCard);
});
