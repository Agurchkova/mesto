export default class UserInfo {
    constructor({ profileName, profileJob }) {
        this._profileName = document.querySelector(profileName);
        this._profileJob = document.querySelector(profileJob);
    }

    /// возврат объекта с данными юзера
    getUserInfo() {
        const userInfo = {
            username: this._profileName.textContent,
            job: this._profileJob.textContent
        }

        return userInfo;
    }

    /// вставляет новые данные юзера и добавляет на страницу
    setUserInfo(data) {
        this._profileName.textContent = data.username;
        this._profileJob.textContent = data.job;
    }
}