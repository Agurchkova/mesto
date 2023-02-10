export default class Api {
    constructor(baseUrl, headers) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        // console.log(this._baseUrl)
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`)
        }
    }

    ///получаем карточки с сервера
    getInitialCards() {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-59/cards`, {
            headers: {
                authorization: 'ed6511d1-8679-4d0e-906b-e0ea7dcb3ddf'
            }
        })
            .then(res => this._checkResponse(res));
    }

    // ///получаем данные о пользователе
    getUserData() {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-59/users/me`, {
            headers: {
                authorization: 'ed6511d1-8679-4d0e-906b-e0ea7dcb3ddf'
            }
        })
            .then(res => this._checkResponse(res));
    }

    /// добавляем новую карточку попапом
    addItem(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(res => this._checkResponse(res));
    }

    /// редактирование данных о пользователе
    editUserData(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.username,
                about: data.job
            })
        })
            .then(res => this._checkResponse(res));
    }

    /// редактирование аватара пользователя
    editAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(res => this._checkResponse(res));
    }

    /// ставим лайк карточке
    setLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(res => this._checkResponse(res));
    }

    /// удаляем лайк
    deleteLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._checkResponse(res));
    }
    /// удаляем карточку
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._checkResponse(res));
    }
}


// const getUserData = () => {
//     return fetch('https://nomoreparties.co/v1/cohort-59/users/me', {
//         headers: {
//             authorization: 'ed6511d1-8679-4d0e-906b-e0ea7dcb3ddf'
//         }
//     })
//         .then(res => res.json())
//         .then((result) => {
//             console.log(result);
//         });
// }
// getUserData();

