import {LightningElement, wire} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import createPicture from '@salesforce/apex/PictureController.createPicture';
import PICTURE_OBJECT from '@salesforce/schema/Picture__c';
import ARTIST_FIELD from '@salesforce/schema/Picture__c.Artist__c';
import {publish, MessageContext} from 'lightning/messageService';
import PICTURE_CHANNEL from '@salesforce/messageChannel/Picture_Service__c';

export default class NewRecordWithFileUpload extends LightningElement {


    artistField = ARTIST_FIELD;
    pictureObject = PICTURE_OBJECT;
    file = {};
    isFileLoading = false;
    isLoaded = false;
    isSubmitting = false;

    @wire(MessageContext)
    messageContext;

    get acceptedFormats() {
        return ['.pdf', '.png', '.jpg'];
    }

    onNameChange(event) {
        this.name = event.detail.value;
    }

    handleArtistChange(event) {

        this.artist = event.detail.value;

    }

    onPriceChange(event) {
        this.price = event.detail.value;
    }


    myFun() {
        this.isFileLoading = false;
        this.isLoaded = true;
    }

    onFileUpload(event) {
        this.isLoaded = false;
        this.isFileLoading = true;
        event.target.blur();
        this.file.name = event.target.files[0].name;
        this.file.name = this.file.name.replace(/\s/g, '');
        this.uploadHelper(event.target.files[0]);

        setTimeout(this.myFun.bind(this), 3000
        );

    }

    uploadHelper(curFile) {
        // create a FileReader object
        this.fileReader = new FileReader();
        // set onload function of FileReader object
        this.fileReader.onloadend = (() => {
            this.file.fileContent = this.fileReader.result;
            let base64 = 'base64,';
            this.content = this.file.fileContent.indexOf(base64) + base64.length;
            this.file.fileContent = this.file.fileContent.substring(this.content);

        });
        this.fileReader.readAsDataURL(curFile);
    }

    isValidForm() {
        if (this.isEmptyObject(this.file)) {

        }
        this.template.querySelector('c-lookup').isValidForm();
        const isValid = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputCmp) => {

                inputCmp.reportValidity();
                return validSoFar && inputCmp.checkValidity();
            }, true);

        return isValid && this.isLoaded && Boolean(this.artist);
    }

    handleSubmitForm() {
        this.isSubmitting = true;
        if (this.isValidForm()) {

            this.savePicture();

        } else {
            const evt = new ShowToastEvent({
                variant: 'warning',
                message: `Please update the invalid form entries and try again`
            })
            this.isSubmitting = false;
            this.dispatchEvent(evt);
        }


    }

    savePicture() {
        let picture = {
            'sobjectType': 'Picture__c',
            'Name': this.name,
            'Artist__c': this.artist,
            'Price__c': this.price,
        }
        createPicture({
            picture: picture,
            file: encodeURIComponent(this.file.fileContent),
            fileName: this.file.name
        })
            .then((result) => {
                let evt = new ShowToastEvent({
                    variant: "success",
                    message: "Picture record {0} created!",
                    messageData: [

                        {
                            url: `/${result}`,
                            label: this.name
                        }
                    ]
                });

                this.isSubmitting = false;
                this.dispatchEvent(evt);
                publish(this.messageContext, PICTURE_CHANNEL, {updateData: true});
            })
            .catch(error => {
                const evt = new ShowToastEvent({
                    variant: 'error',
                    message: `Error: ${error.body.message}`
                })
                this.isSubmitting = false;
                this.dispatchEvent(evt);
            });


    }

    resetFields() {
        this.file = {};
        this.isLoaded = false;
        this.template.querySelector('c-lookup').resetField();

        const inputFields = this.template.querySelectorAll(
            'lightning-input'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.value = null;
            });
        }
    }

    isEmptyObject(obj) {
        if (obj === undefined) {
            return true;
        }
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false;
            }
        }

        return JSON.stringify(obj) === JSON.stringify({});
    }
}