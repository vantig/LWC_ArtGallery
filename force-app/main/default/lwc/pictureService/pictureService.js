import {LightningElement} from 'lwc';

export default class PictureService extends LightningElement {

    filterByName(event){
        this.template.querySelector('c-pictures-search-result').artistName = event.detail.name;
    }
    searchPictures(event) {
        this.template.querySelector('c-pictures-search-result').searchString = event.detail.searchString;
    }

}