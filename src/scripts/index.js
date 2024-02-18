import {initialCards} from "./cards";
const placesList = document.querySelector('.places__list');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');

export function createCard(initialCard, removeCardCallback, likeButtonCallback, openTypeImageModalCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardTitle = placesItem.querySelector('.card__title');
  const cardDeleteButton = placesItem.querySelector('.card__delete-button');
  const cardLikeButton = placesItem.querySelector('.card__like-button');

  placesItem.querySelector('.card__image').src = initialCard.link;
  placesItem.querySelector('.card__image').alt = initialCard.name;
  cardTitle.textContent = initialCard.name;

  function removeCard() {
    removeCardCallback(placesItem);
  }

  function likeButton(evt) {
    likeButtonCallback(evt);
  }

  function openTypeImageModal(evt) {
    openTypeImageModalCallback(evt);
  }

  cardDeleteButton.addEventListener('click', removeCard);
  cardLikeButton.addEventListener('click', likeButton);
  placesList.addEventListener('click', openTypeImageModal);

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

export function openTypeImageModal(evt) {
  if (evt.target.classList.contains('card__image')) {
    popupTypeImage.style.display = 'flex';
    const eventTarget = evt.target;
    popupImage.src = eventTarget.src;
  }
}

function addCard(item) {
  let placesItem = createCard(item, removeCard, likeButton, openTypeImageModal);
  placesList.append(placesItem);
}

initialCards.forEach((item) => {
  addCard(item);
});


