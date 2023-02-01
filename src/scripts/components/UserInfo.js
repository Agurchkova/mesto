export default class UserInfo {
    constructor({ profileNameSelector, profileJobSelector }) {
        this._profileNameSelector = document.querySelector(profileNameSelector);
        this._profileJobSelector = document.querySelector(profileJobSelector);
    }

    /// возврат объекта с данными юзера
    getUserInfo() {
        const userInfo = {
            username: this._profileNameSelector.textContent,
            job: this._profileJobSelector.textContent
        }

        return userInfo;
    }

    /// вставляет новые данные юзера и добавляет на страницу
    setUserInfo(data) {
        this._profileNameSelector.textContent = data.username;
        this._profileJobSelector.textContent = data.job;
    }
}