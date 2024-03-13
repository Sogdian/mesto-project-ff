const BASE_URL = 'https://nomoreparties.co/v1/wff-cohort-9'
const options = {
    headers: {
        authorization: 'f8c1f4d7-8688-4c9f-adde-6b534a3a7e9a',
        'Content-Type': 'application/json'
    }
}

export function getUser(){
    return fetch(BASE_URL + '/users/me', options)
    .then(handleResponse);
}

export function getCards() {
    return fetch(BASE_URL + '/cards', options)
      .then(handleResponse);
}

function handleResponse(response) {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Что-то пошло не так: ${response.status}`);
}