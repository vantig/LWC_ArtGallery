import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import PICTURE_OBJECT from '@salesforce/schema/Picture__c';
import NAME_FIELD from '@salesforce/schema/Picture__c.Name';
import ARTIST_FIELD from '@salesforce/schema/Picture__c.Artist__c';
import PRICE_FIELD from '@salesforce/schema/Picture__c.Price__c';
import { NavigationMixin } from 'lightning/navigation';
export default class LightningToastExample extends NavigationMixin(LightningElement) {
    objectApiName = PICTURE_OBJECT;
    fields = [NAME_FIELD, ARTIST_FIELD, PRICE_FIELD];

    handleSuccess(event) {
        const evt  = new ShowToastEvent({
            title: "Picture created",
            variant: "success",
            message: "Record {0} created!",
            messageData: [

                {
                    url: `https://www.salesforce.com/{$event.detail.id}`,
                    label: event.detail.id
                }
            ]
        });
        this.dispatchEvent(evt);
        this.template.querySelector('lightning-record-form').recordId=null;
    }
}