import { likeCards, unlikeCards } from './api'

export function createCard(
    initialCard,
    openTypeDeleteCard,
    likeButton,
    openTypeImageModal,
    id,
) {
    const cardTemplate = document.querySelector('#card-template').content
    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true)
    const cardTitle = placesItem.querySelector('.card__title')
    const cardDeleteButton = placesItem.querySelector('.card__delete-button')
    const cardLikeButton = placesItem.querySelector('.card__like-button')
    const cardImage = placesItem.querySelector('.card__image')
    const cardLike = placesItem.querySelector('.card__like')

    cardImage.src = initialCard.link
    cardImage.alt = initialCard.name
    cardTitle.textContent = initialCard.name
    cardLike.textContent = initialCard.likes.length

    initialCard.likes.forEach((item) => {
        if (item['_id'] === id) {
            cardLikeButton.classList.add('card__like-button_is-active')
        }
    })

    if (initialCard.owner['_id'] != id) {
        cardDeleteButton.style.display = 'none'
    } else {
        cardDeleteButton.style.display = 'block'
    }

    cardDeleteButton.addEventListener('click', () => {
        openTypeDeleteCard(initialCard['_id'], placesItem)
    })
    cardLikeButton.addEventListener('click', () => {
        likeButton(placesItem, initialCard['_id'], initialCard.owner['_id'])
    })
    cardImage.addEventListener('click', openTypeImageModal)

    return placesItem
}

export const likeCard = async (placesItem, id) => {
    const cardLike = placesItem.querySelector('.card__like')
    const cardLikeButton = placesItem.querySelector('.card__like-button')

    if (cardLikeButton.classList.contains('card__like-button_is-active')) {
        await unlikeCards(id)
            .then((res) => {
                cardLike.textContent = res.likes.length
                cardLikeButton.classList.toggle('card__like-button_is-active')
            })
            .catch(console.error)
    } else {
        await likeCards(id)
            .then((res) => {
                cardLike.textContent = res.likes.length
                cardLikeButton.classList.toggle('card__like-button_is-active')
            })
            .catch(console.error)
    }
}