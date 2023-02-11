export default class UserInfo {
    constructor({ profileNameSelector, profileJobSelector, profileAvatarSelector }) {
        this._profileNameSelector = document.querySelector(profileNameSelector),
            this._profileJobSelector = document.querySelector(profileJobSelector),
            this._profileAvatarSelector = document.querySelector(profileAvatarSelector)
    }

    /// возврат объекта с данными юзера
    getUserInfo() {
        const userInfo = {
            username: this._profileNameSelector.textContent,
            job: this._profileJobSelector.textContent,
            avatar: this._profileAvatarSelector.src
        }
        return userInfo;

    }

    /// вставляет новые данные юзера и добавляет на страницу
    setUserInfo(data) {
        this._profileNameSelector.textContent = data.username,
            this._profileJobSelector.textContent = data.job,
            this._profileAvatarSelector.src = data.avatar,
            console.log(data.username)
    }

}