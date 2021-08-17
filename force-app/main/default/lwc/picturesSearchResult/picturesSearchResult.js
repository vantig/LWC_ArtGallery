import {LightningElement, api, wire} from 'lwc';
import getPictures from '@salesforce/apex/PictureDataService.getPictures';
import {refreshApex} from '@salesforce/apex';
import {subscribe, MessageContext} from 'lightning/messageService';
import PICTURE_CHANNEL from '@salesforce/messageChannel/Picture_Service__c';

export default class PicturesSearchResult extends LightningElement {

    @api searchString = '';
    @api artistName = '';
    data;
    dataState;
    subscription = null;

    @wire(getPictures, {searchString: '$searchString'})
    wiredPictures(value) {
        this.dataState = value;
        const {data, error} = value; // destructure the provisioned value
        if (data) {
            this.data = data
        } else if (error) {

        }
    }

    @wire(MessageContext)
    messageContext;

    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.messageContext,
            PICTURE_CHANNEL,
            (message) => this.handleMessage(message)
        );
    }

    handleMessage(message) {
        if (message.updateData) {
            refreshApex(this.dataState);
        }

    }

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    get pictures() {
        if (this.artistName.length > 0) {
            const regex = new RegExp(`^${this.artistName}`, 'i');
            return this.data.filter(picture => picture.Artist__r.Name.match(regex));
        } else {
            return this.data;
        }

    }
}