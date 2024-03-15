const BASE_URL = "https://nomoreparties.co/v1/wff-cohort-9";
const getOptions = {
  headers: {
    authorization: "f8c1f4d7-8688-4c9f-adde-6b534a3a7e9a",
    "Content-Type": "application/json",
  },
};

export function getUser() {
  return fetch(BASE_URL + "/users/me", getOptions)
    .then(handleResponse);
}

export function getCards() {
  return fetch(BASE_URL + "/cards", getOptions)
    .then(handleResponse);
}

export function postCards(card) {
  return fetch(BASE_URL + "/cards", {
    method: "POST",
    headers: getOptions.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  })
    .then(handleResponse);
}

export function deleteCards(cardId) {
  return fetch(BASE_URL + "/cards/" + `${cardId}`, {
    method: "DELETE",
    headers: getOptions.headers,
  })
    .then(handleResponse);
}

export function upgradeUser(user) {
  return fetch(BASE_URL + "/users/me", {
    method: "PATCH",
    headers: getOptions.headers,
    body: JSON.stringify({
      name: user.name,
      about: user.about,
    }),
  })
    .then(handleResponse);
}

export function likeCards(cardId) {
  return fetch(BASE_URL + "/cards/likes/" + `${cardId}`, {
    method: "PUT",
    headers: getOptions.headers,
  })
    .then(handleResponse);
}

export function unlikeCards(cardId) {
  return fetch(BASE_URL + "/cards/likes/" + `${cardId}`, {
    method: "DELETE",
    headers: getOptions.headers,
  })
    .then(handleResponse);
}

export function upgradeAvatar(user) {
  return fetch(BASE_URL + "/users/me/avatar", {
    method: "PATCH",
    headers: getOptions.headers,
    body: JSON.stringify({
      avatar: user.avatar,
    }),
  })
    .then(handleResponse);
}

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
}