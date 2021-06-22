import {LightningElement, wire} from 'lwc';
import {reduceErrors} from 'c/ldsUtils';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {publish, MessageContext} from 'lightning/messageService';
import PICTURE_CHANNEL from '@salesforce/messageChannel/Picture_Service__c';
import createContactWithUser from '@salesforce/apex/ArtistHelper.createContactWithUser';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import BIRTHDATE_FIELD from '@salesforce/schema/Contact.Birthdate';
import CONTACT_OBJECT from '@salesforce/schema/Contact'


export default class ArtistCreator extends LightningElement {
    object = CONTACT_OBJECT;
    nameField = NAME_FIELD;
    emailField = EMAIL_FIELD;
    phoneField = PHONE_FIELD;
    birthdateField = BIRTHDATE_FIELD;

    @wire(MessageContext)
    messageContext;

    handleSubmit(event) {
        event.preventDefault();
        createContactWithUser({con: event.detail.fields})
            .then(result => {
                let evt = new ShowToastEvent({
                    variant: "success",
                    message: "Contact record {0} created!",
                    messageData: [

                        {
                            url: `/${result[0]}`,
                            label: result[0]
                        }
                    ]
                });
                this.dispatchEvent(evt);
                evt = new ShowToastEvent({
                    variant: "success",
                    message: "User record {0} created!",
                    messageData: [

                        {
                            url: `/${result[1]}`,
                            label: result[1]
                        }
                    ]
                });
                this.dispatchEvent(evt);
                publish(this.messageContext, PICTURE_CHANNEL, {updateData: true});
            })
            .catch(error => {
                const evt = new ShowToastEvent({
                    variant: 'error',
                    message: `Error: ${error.body.message}`
                })
                this.dispatchEvent(evt);
            });
    }


    resetFields() {
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
    }
}