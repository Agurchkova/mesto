import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

    constructor(popupSelector) {
        super(popupSelector);
        this._popupBigImage = this._popup.querySelector('.popup__big-image');
        this._popupImageCaption = this._popup.querySelector('.popup__image-caption');
    }

    open(link, name) {
        this._popupBigImage.src = link;
        this._popupBigImage.alt = name;
        this._popupImageCaption.textContent = name;
        super.open();
    }
}
