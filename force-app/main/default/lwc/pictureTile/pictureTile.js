import {LightningElement, api} from 'lwc';

export default class BotTile extends LightningElement {

    @api  picture;

    get backgroundStyle() {
        return `background-image:url(${this.picture.Image_Path__c})`;
    }

    selectPicture() {
        const evt = new CustomEvent("pictureselect", {
            detail: {
                id: this.picture.Id
            }
        });
        this.dispatchEvent(evt);
    }
}