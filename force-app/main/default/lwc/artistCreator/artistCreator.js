import {LightningElement, track} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
// Importing Apex Class method
// import saveAccount from '@salesforce/apex/LWCExampleController.saveAccountRecord';
import {createRecord} from 'lightning/uiRecordApi';
// importing Account fields
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import BIRTHDATE_FIELD from '@salesforce/schema/Contact.Birthdate';
import OWNER_FIELD from '@salesforce/schema/Contact.OwnerId';
import CONTACT_OBJECT from '@salesforce/schema/Contact';

export default class ArtistCreator extends LightningElement {


    record;


    handleNameChange(event) {
        this.record.Name = event.target.value;
    }

    handleLastNameChange(event) {
        this.record.LastName = event.target.value;
    }

    handleEmailChange(event) {
        this.record.Email = event.target.value;
    }

    handlePhoneChange(event) {
        this.record.Phone = event.target.value;
    }

    handleBirthdateChange(event) {
        this.record.Birthdate = event.target.value;
    }


    handleCreate() {
        console.log("handle");
        const recordInput = {
            apiName: CONTACT_OBJECT.objectApiName, fields: {
                [NAME_FIELD.fieldApiName]:
                this.record.Name,
                [LASTNAME_FIELD.fieldApiName]:
                this.record.LastName,
                [EMAIL_FIELD.fieldApiName]:
                this.record.Email,
                [PHONE_FIELD.fieldApiName]:
                this.record.Phone,
                [BIRTHDATE_FIELD.fieldApiName]:
                this.record.Birthdate
            }
        };
        createRecord(recordInput)

            .then(() => {
                // Clear the user enter values
                this.record = {};

                const evt = new ShowToastEvent({

                    variant: 'success',
                    message: "Record {0} created!",
                    messageData: [

                        {
                            url: `https://www.salesforce.com/{$this.record.ID}`,
                            label: this.record.Name
                        }
                    ]

                })
                this.dispatchEvent(evt);
            })
            .catch(error => {
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
}
// import { LightningElement } from 'lwc';
// import { createRecord } from 'lightning/uiRecordApi';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import ACCOUNT_OBJECT from '@salesforce/schema/Account';
// import NAME_FIELD from '@salesforce/schema/Account.Name';
//
// export default class LdsCreateRecord extends LightningElement {
//     accountId;
//     name = '';
//
//     handleNameChange(event) {
//         this.accountId = undefined;
//         this.name = event.target.value;
//     }
//     createAccount() {
//         const fields = {};
//         fields[NAME_FIELD.fieldApiName] = this.name;
//         const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields };
//         createRecord(recordInput)
//             .then(account => {
//                 this.accountId = account.id;
//                 this.dispatchEvent(
//                     new ShowToastEvent({
//                         title: 'Success',
//                         message: 'Account created',
//                         variant: 'success',
//                     }),
//                 );
//             })
//             .catch(error => {
//                 this.dispatchEvent(
//                     new ShowToastEvent({
//                         title: 'Error creating record',
//                         message: error.body.message,
//                         variant: 'error',
//                     }),
//                 );
//             });
//     }
// }