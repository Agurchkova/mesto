export default class UserInfo {
    constructor({ username, job }) {
        this._username = document.querySelector(username);
        this._job = document.querySelector(job);
    }

    //////// объект с данными юзера
    getUserInfo() {
        const userInfo = {
            username: this._username.textContent,
            job: this._job.textContent
        }
        return userInfo;

    }

    ////////принимает новые данные юзера и добавляет на страницу
    setUserInfo(data) {
        this._username.textContent = data.name;
        this._job.textContent = data.about;

    }
};