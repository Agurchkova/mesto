import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

    constructor(popupSelector) {
        super(popupSelector);
        this._popupBigImage = this._popup.querySelector('.popup__big-image');
        this._popupImageCaption = this._popup.querySelector('.popup__image-caption');
    }

    /// открывает попап с необходимыми значениями
    open(name, link) {
        this._popupBigImage.alt = name;
        this._popupBigImage.src = link;
        this._popupImageCaption.textContent = name;

        super.open();
    }
}