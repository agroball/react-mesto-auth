export class Api {
    constructor(options) {
        this.headers = options.headers;
        this.baseUrl = options.baseUrl;
    }


    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
                headers: this.headers
            })
            .then(this._checkResult)
            .catch(this._showError)
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
                method: 'GET',
                headers: this.headers
            })
            .then(this._checkResult)
            .catch(this._showError)
    }

    setUserInfo(newName, newAbout) {
        return fetch(`${this.baseUrl}/users/me`, {
                method: "PATCH",
                headers: this.headers,
                body: JSON.stringify({
                    name: newName,
                    about: newAbout
                })
            })
            .then(this._checkResult)
            .catch(this._showError);
    }

    updateAvatarImage(data) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify(data)
            })
            .then(this._checkResult)
            .catch(this._showError);
    }

    addCard(name, link) {
        return fetch(`${this.baseUrl}/cards`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    name: name,
                    link: link
                })

            })
            .then(this._checkResult)
            .catch(this._showError);
    }

    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
                method: 'DELETE',
                headers: this.headers,

            })
            .then(this._checkResult)
            .catch(this._showError);
    }

    addLike(cardId) {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
                method: 'PUT',
                headers: this.headers,
            })
            .then(this._checkResult)
            .catch(this._showError);
    }
    removeLike(cardId) {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
                method: 'DELETE',
                headers: this.headers,

            })
            .then(this._checkResult)
            .catch(this._showError);
    }

    _checkResult(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    };

    _showError(err) {
        console.log(err);
        return Promise.reject(err);
    };

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return this.addLike(cardId)
        } else {
            return this.removeLike(cardId)
        }
    };

}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
    headers: {
        authorization: 'dc63b407-867c-4698-ab85-c3ed97052e84',
        'Content-type': 'application/json'
    }
});

export default api;




// fetch('https://mesto.nomoreparties.co/v1/cohort-20/cards', {
//         headers: {
//             authorization: 'dc63b407-867c-4698-ab85-c3ed97052e84'
//         }
//     })
//     .then(res => res.json())
//     .then((result) => {
//         console.log(result);
//     });