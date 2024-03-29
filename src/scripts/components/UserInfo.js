export default class UserInfo {
    constructor({ profileNameSelector, profileJobSelector, profileAvatarSelector }) {
        this._profileNameSelector = document.querySelector(profileNameSelector),
            this._profileJobSelector = document.querySelector(profileJobSelector),
            this._profileAvatarSelector = document.querySelector(profileAvatarSelector)
    }

    /// возвращаем объект с данными юзера
    getUserInfo() {
        const userInfo = {
            username: this._profileNameSelector.textContent,
            job: this._profileJobSelector.textContent,
            avatar: this._profileAvatarSelector.src
        }
        return userInfo;

    }

    /// вставляем новые данные юзера и добавляет на страницу
    setUserInfo(data) {
        this._profileNameSelector.textContent = data.name,
            this._profileJobSelector.textContent = data.about,
            this._profileAvatarSelector.src = data.avatar
    }

}