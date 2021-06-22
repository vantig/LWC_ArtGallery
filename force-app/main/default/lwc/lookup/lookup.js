import {LightningElement, api, track} from 'lwc';

export default class CustomLookup extends LightningElement {
    @api objectApiName;
    @api fieldApiName;
    @api disabled = false;
    @api value;
    @api required = false;

    handleChange(event) {
        const evt = new CustomEvent('valueselected', {

            detail: {value: event.detail.value[0]}
        });
        this.dispatchEvent(evt);
    }

    @api
    resetField() {
        this.template.querySelector('lightning-input-field').value = null;
    }

    @api
    isValidForm() {
        let form = this.template.querySelector('lightning-input-field');
        form.reportValidity();

    }
}