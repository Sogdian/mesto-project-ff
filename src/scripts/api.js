// Promise.all(usersMe, cards)
// .then()

export function getUser(){
    return fetch('https://nomoreparties.co/v1/wff-cohort-9/users/me ', {
    headers: {
        authorization: 'f8c1f4d7-8688-4c9f-adde-6b534a3a7e9a'
    }
    })
    .then(res => {
        return res.json()
    });
}

export function getCards() {
    return fetch('https://nomoreparties.co/v1/wff-cohort-9/cards', {
        headers: {
            authorization: 'f8c1f4d7-8688-4c9f-adde-6b534a3a7e9a'
        }
    })
      .then(res => {
          return res.json()
      });
}
