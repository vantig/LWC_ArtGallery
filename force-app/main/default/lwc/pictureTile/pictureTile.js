import {LightningElement, api} from 'lwc';

export default class BotTile extends LightningElement {

    @api  picture;

    get backgroundStyle() {
        return `background-image:url(${this.picture.Image_Path__c})`;
    }

    // get imagePath() {
    //     let path = this.picture.Picture_Image__c.replace("\\|\;", '');
    //     let startIndex = this.picture.Picture_Image__c.indexOf("\"") + 1;
    //     let endIndex = this.picture.Picture_Image__c.indexOf(" alt")-1;
    //
    //     return path.substr(startIndex, endIndex - startIndex);
    // }

    selectPicture() {
        const evt = new CustomEvent("pictureselect", {
            detail: {
                id: this.picture.Id
            }
        });
        this.dispatchEvent(evt);
    }

    cli() {
        console.log(this.imagePath);
    }
}