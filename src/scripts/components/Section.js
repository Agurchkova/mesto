export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    /// создает и отрисовывает карточки 
    renderItems(data) {
        data.forEach(this._renderer);
    }

    /// добавляет карточки на страницу
    addItem(element) {
        this._container.prepend(element);
    }
}