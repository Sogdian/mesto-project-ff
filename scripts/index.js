// @todo: Темплейт карточки

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCards() {
  const cardTemplate = document.querySelector('#card-template').content;

  initialCards.forEach((item) => {
    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);

    placesItem.querySelector('.card__image').src = item.link;
    placesItem.querySelector('.card__image').alt = item.name;

    placesList.append(placesItem);
  });
}

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
addCards();
