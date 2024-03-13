const BASE_URL = 'https://nomoreparties.co/v1/wff-cohort-9'
const getOptions = {
    headers: {
        authorization: 'f8c1f4d7-8688-4c9f-adde-6b534a3a7e9a',
        'Content-Type': 'application/json'
    }
}

const postOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'ivan',
        link: 'ivan'
    })
}

export function getUser(){
    return fetch(BASE_URL + '/users/me', getOptions)
    .then(handleResponse);
}

export function getCards() {
    return fetch(BASE_URL + '/cards', getOptions)
      .then(handleResponse);
}

export function postCards(name, link) {
    fetch(BASE_URL + '/cards', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
      .then(handleResponse);
}

function handleResponse(response) {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Что-то пошло не так: ${response.status}`);
}