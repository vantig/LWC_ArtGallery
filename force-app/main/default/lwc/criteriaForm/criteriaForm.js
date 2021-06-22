import {LightningElement} from 'lwc';

export default class BoatSearchForm extends LightningElement {
    selectedValue='';

    searchOptions = [
        {label: 'All', value: ''}, {
            label: 'Price min',
            value: 'ORDER BY Price__c ASC NULLS LAST'
        }, {
            label: 'Price max',
            value: 'ORDER BY Price__c DESC NULLS LAST'
        }];
    onNameChange(event) {

        const evt = new CustomEvent('namesearch', {
            detail: {name: event.detail.value}
        });
        this.dispatchEvent(evt);
    }

    handleSearchOptionChange(event) {

        event.preventDefault();
        this.selectedValue = event.detail.value;
        const evt = new CustomEvent('search', {
            detail: {searchString: this.selectedValue}
        });
        this.dispatchEvent(evt);
    }
}
