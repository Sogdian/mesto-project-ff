const placesList = document.querySelector('.places__list');

function addCard(initialCard, removeCardCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardDeleteButton = placesItem.querySelector('.card__delete-button');

  placesItem.querySelector('.card__image').src = initialCard.link;
  placesItem.querySelector('.card__image').alt = initialCard.name;

  function removeCard() {
    // placesItem.remove();
    // console.log("13 placesItem.remove()")
    // Вызывайте колбэк только после удаления карточки
    removeCardCallback(placesItem);
    // console.log("16 removeCardCallback")
  }

  cardDeleteButton.addEventListener('click', removeCard);

  placesList.append(placesItem);
}

const removeCard = (item) => {
  item.remove();
  // console.log("25 removeCard()")
}

initialCards.forEach((item) => {
  addCard(item, removeCard);
});
