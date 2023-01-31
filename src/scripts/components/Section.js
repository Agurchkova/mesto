export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._initialCards = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    /// создает и отрисовывает карточки 
    renderItems() {
        this._initialCards.forEach(this._renderer);
    }
    /// добавляет карточки на страницу
    addItem(element) {
        this._container.prepend(element);
    }
}