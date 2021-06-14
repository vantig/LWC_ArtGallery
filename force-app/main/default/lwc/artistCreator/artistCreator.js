import {LightningElement, api} from 'lwc';
import {reduceErrors} from 'c/ldsUtils';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import createUser from '@salesforce/apex/UserController.createUser';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import BIRTHDATE_FIELD from '@salesforce/schema/Contact.Birthdate';
import CONTACT_OBJECT from '@salesforce/schema/Contact';

export default class ArtistCreator extends LightningElement {
    @api recordId;
    object = CONTACT_OBJECT;
    nameField = NAME_FIELD;
    emailField = EMAIL_FIELD;
    phoneField = PHONE_FIELD;
    birthdateField = BIRTHDATE_FIELD;

    handleCreate(event) {
        const evt = new ShowToastEvent({
            variant: "success",
            message: "Contact record {0} created!",
            messageData: [

                {
                    url: `/${event.detail.id}`,
                    label: event.detail.id
                }
            ]
        });
        this.dispatchEvent(evt);
        this.resetFields();
        createUser({contactId: event.detail.id})
            .then(id => {
                const evt = new ShowToastEvent({
                    variant: "success",
                    message: "User record {0} created!",
                    messageData: [

                        {
                            url: `/${id}`,
                            label: id
                        }
                    ]
                });
                this.dispatchEvent(evt);
            })
            .catch(error => {
                console.log('error' + JSON.stringify(error))
                console.log(reduceErrors(error))
                const evt = new ShowToastEvent({

                    variant: 'error',
                    message: "Record error : {0}!",
                    messageData: [


                        {
                            label: error.body.message
                        }
                    ]

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
