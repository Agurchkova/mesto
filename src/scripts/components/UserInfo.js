export default class UserInfo {
    constructor({ username, job }) {
        this._username = document.querySelector(username);
        this._job = document.querySelector(job);
    }

    /// возврат объекта с данными юзера
    getUserInfo() {
        const userInfo = {
            username: this._username.textContent,
            job: this._job.textContent
        }
        return userInfo;
    }

    /// вставляет новые данные юзера и добавляет на страницу
    setUserInfo(data) {
        this._username.textContent = data.username;
        this._job.textContent = data.job;
    }
}